const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');


//matcher
var stringSimilarity = require("string-similarity");


//models
const PFEs=require('./models/PFEs');
const user=require('./models/user');
const entreprise=require('./models/entreprise');
//bycrypt setting 
const salt=bcrypt.genSaltSync(10);

// middlwaire

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true,origin: 'http://localhost:3000'}));
// app.use(cors({
//     credentials: true,
//     origin: 'https://emsipfe.vercel.app',
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
//   }));

//connect database


mongoose.connect('mongodb://localhost:27017/emsi',{

    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
}).then(e=>console.log('database is connect')).catch(err=>console.log('Failed to connect'))

//// midlwares

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });
  

app.post('/addUser',async (req,res)=>{
    const {nom,prenom,filier,specialite,email,password,role}=req.body
    try{
        let userInfo=await user.create({
            nom,
            prenom,
            filier,
            specialite,
            email,
            password:bcrypt.hashSync(password,salt),
            role,
        });
        res.json(userInfo);
    }catch(e){
        res.status(400).json(e);
    }
    
})




app.post('/login',async (req,res)=>{
    const {email,password}=req.body
    const userInfo=await user.findOne({email:email});
    if(userInfo==null){
        res.status(400).json('user not found')
    }
    const passOK=bcrypt.compareSync(password,userInfo.password);
    if(passOK){
        jwt.sign({id:userInfo._id,nom:userInfo.nom,prenom:userInfo.prenom,email:userInfo.email,filier:userInfo.filier,specialite:userInfo.specialite,role:userInfo.role},"LFKJEN5dzjdnKDNZLJ526dd",(err,token)=>{
            if (err) throw err;

            res.cookie('token',token).json({id:userInfo._id,nom:userInfo.nom,prenom:userInfo.prenom,filier:userInfo.filier,specialite:userInfo.specialite,role:userInfo.role})
        })
    }else{
        res.status(401).json("wrong")
    }
})

app.get('/login',(req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,'LFKJEN5dzjdnKDNZLJ526dd',(err,info)=>{
            if(err) throw err;
            res.json(info)
        })
    }else{
        res.json(false)
    }
})



app.post("/addpfe",async (req,res)=>{
    
    const {token}=req.cookies;
    console.log(token);
    jwt.verify(token,'LFKJEN5dzjdnKDNZLJ526dd',{},async (err,info)=>{


        const {titre,domainEtude,problematique,entreprise,description}=req.body

        
        const pfeDocument=await PFEs.create({
            titre,
            domainEtude,
            problematique,
            entreprise,
            description,
            author:info.id,
        })
        if(info.role=="ETUDIANT"){
            pfeDocument.inscrire=info.id;
            pfeDocument.inscrie=true;
            pfeDocument.save()
        }else if(info.role=="ENSEIGNANT"){
            pfeDocument.encadrent=info.id;
            pfeDocument.encadrer=true;
            pfeDocument.save()
        }else if(info.role=="COORDINATEUR"){
            pfeDocument.valider=true;
            pfeDocument.save();
        }

        res.status(200).json(pfeDocument) 
    })
    
})

// app.get('/listePfeNonValider',async (req,res)=>{
//     res.json(await PFEs.find({valider:false}).populate('author').populate('inscrire'))
// })
app.get('/listePfeNonValider', async (req, res) => {
    try {
        const nonValidatedPfes = await PFEs.find({ valider: false }).populate('author').populate('inscrire');

        // Populate the entreprise field with the name of the enterprise
        const populatedPfes = await Promise.all(nonValidatedPfes.map(async (pfe) => {
            const populatedPfe = pfe.toObject();
            if (populatedPfe.entreprise) {
                const enterprise = await entreprise.findById(populatedPfe.entreprise);
                if (enterprise) {
                    populatedPfe.entreprise = enterprise.nom;
                }
            }
            return populatedPfe;
        }));

        res.status(200).json(populatedPfes);
    } catch (error) {
        console.error('Error fetching non-validated PFEs:', error);
        res.status(500).json({ error: 'Failed to fetch non-validated PFEs' });
    }
});


// app.get('/listePfeValider',async (req,res)=>{
//     const {token}=req.cookies;
//     const resulta=await PFEs.find({valider:true,encadrer:false}).populate('author')
//     if(!token){
//         return res.json(false)
//     }else{
//         jwt.verify(token,'LFKJEN5dzjdnKDNZLJ526dd',{},async (err,info)=>{
            
//             const data=resulta.map((item)=>{
//                 var similarity = stringSimilarity.compareTwoStrings(info.specialite, item.domainEtude);
//                 let don={...item}
//                 don._doc["similaire"] = similarity;
//                 return don._doc
//             })
//             res.json(data.sort((a,b) => b.similaire - a.similaire))
//         })
//     }
// })

app.get('/listePfeValider', async (req, res) => {
    try {
        const { token } = req.cookies;
        const resulta = await PFEs.find({ valider: true, encadrer: false }).populate('author');

        if (!token) {
            return res.json(false);
        } else {
            jwt.verify(token, 'LFKJEN5dzjdnKDNZLJ526dd', {}, async (err, info) => {
                if (err) {
                    console.error('Error verifying token:', err);
                    return res.status(500).json({ error: 'Failed to verify token' });
                }

                const populatedPfes = await Promise.all(resulta.map(async (item) => {
                    const similarity = stringSimilarity.compareTwoStrings(info.specialite, item.domainEtude);
                    let populatedPfe = item.toObject();

                    // Calculate similarity and add it to the populated PFE object if it's a valid number
                    if (!isNaN(similarity)) {
                        populatedPfe.similaire = similarity;
                    }

                    // Populate the entreprise field with the name of the enterprise
                    if (populatedPfe.entreprise) {
                        const enterprise = await entreprise.findById(populatedPfe.entreprise);
                        if (enterprise) {
                            populatedPfe.entreprise = enterprise.nom;
                        }
                    }

                    return populatedPfe;
                }));

                // Filter out items with invalid similarity
                const validPfes = populatedPfes.filter(pfe => !isNaN(pfe.similaire));

                // Sort the valid Pfes based on similarity
                const sortedPfes = validPfes.sort((a, b) => b.similaire - a.similaire);

                res.json(sortedPfes);
            });
        }
    } catch (error) {
        console.error('Error fetching validated PFEs:', error);
        res.status(500).json({ error: 'Failed to fetch validated PFEs' });
    }
});





app.put('/valider',async (req,res)=>{
    const {id}=req.body
    console.log(id);
    const {token}=req.cookies
    const pfeDoc=await PFEs.findById(id)
    await pfeDoc.updateOne({valider:true})
    res.status(200).json(pfeDoc)
})

app.put('/encadrer',(req,res)=>{
    const {id}=req.body
    const {token}=req.cookies
    if(!token){
        res.json(false)
    }
    jwt.verify(token,'LFKJEN5dzjdnKDNZLJ526dd',{},async (err,info)=>{
        if(err) throw err;
        const pfeDoc=await PFEs.findById(id)
        await pfeDoc.updateOne({encadrent:info.id,encadrer:true})
        res.status(200).json(pfeDoc)
    })
})

// app.get('/listencadrer',(req,res)=>{
//     const {token}=req.cookies;
//     console.log(token);
//     if(!token){
//         res.status(400).json(false)
//     }
//     jwt.verify(token,'LFKJEN5dzjdnKDNZLJ526dd',{},async (err,info)=>{
//         if(err) throw err;
//         const pfes=await PFEs.find({valider:true,inscrie:true,encadrent:info.id}).populate('author').populate('inscrire')

//         res.json(pfes)
//     })
// })
app.get('/listencadrer', async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(400).json(false);
        }

        jwt.verify(token, 'LFKJEN5dzjdnKDNZLJ526dd', {}, async (err, info) => {
            if (err) {
                console.error('Error verifying token:', err);
                return res.status(500).json({ error: 'Failed to verify token' });
            }

            const pfes = await PFEs.find({ valider: true, inscrie: true, encadrent: info.id })
                .populate('author')
                .populate('inscrire')
                .populate('entreprise'); // Populate the entreprise field

            // Populate the entreprise field with the name of the enterprise
            const populatedPfes = await Promise.all(pfes.map(async (pfe) => {
                const populatedPfe = pfe.toObject();
                if (populatedPfe.entreprise) {
                    const enterprise = await entreprise.findById(populatedPfe.entreprise);
                    if (enterprise) {
                        populatedPfe.entreprise = enterprise.nom;
                    }
                }
                return populatedPfe;
            }));

            res.json(populatedPfes);
        });
    } catch (error) {
        console.error('Error fetching validated PFEs:', error);
        res.status(500).json({ error: 'Failed to fetch validated PFEs' });
    }
});


// app.get('/listePfeInscrire',async (req,res)=>{
//     res.json(await PFEs.find({valider:true,encadrer:true,inscrie:false}).populate('author'));
// })

app.get('/listePfeInscrire', async (req, res) => {
    try {
        const pfes = await PFEs.find({ valider: true, encadrer: true, inscrie: false }).populate('author');

        // Populate the entreprise field with the name of the enterprise
        const populatedPfes = await Promise.all(pfes.map(async (pfe) => {
            const populatedPfe = pfe.toObject();
            if (populatedPfe.entreprise) {
                const enterprise = await entreprise.findById(populatedPfe.entreprise);
                if (enterprise) {
                    populatedPfe.entreprise = enterprise.nom;
                }
            }
            return populatedPfe;
        }));

        res.status(200).json(populatedPfes);
    } catch (error) {
        console.error('Error fetching PFEs for inscription:', error);
        res.status(500).json({ error: 'Failed to fetch PFEs for inscription' });
    }
});


// app.get('/monPfeEtudiant',(req,res)=>{
//     const {token}=req.cookies;
//     jwt.verify(token,'LFKJEN5dzjdnKDNZLJ526dd',{},async (err,info)=>{
//         if(err) throw err;
//         const monpfe=await PFEs.find({inscrire:info.id,valider:true}).populate('author').populate('encadrent')
//         res.json(monpfe)
//     })
// })

app.get('/monPfeEtudiant', async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(400).json(false);
        }
        
        jwt.verify(token, 'LFKJEN5dzjdnKDNZLJ526dd', {}, async (err, info) => {
            if (err) {
                console.error('Error verifying token:', err);
                return res.status(500).json({ error: 'Failed to verify token' });
            }

            const monpfe = await PFEs.find({ inscrire: info.id, valider: true })
                                      .populate('author')
                                      .populate('encadrent');

            // Populate the entreprise field with the name of the enterprise
            const populatedPfes = await Promise.all(monpfe.map(async (item) => {
                let populatedPfe = item.toObject();
                if (populatedPfe.entreprise) {
                    const enterprise = await entreprise.findById(populatedPfe.entreprise);
                    if (enterprise) {
                        populatedPfe.entreprise = enterprise.nom;
                    }
                }
                return populatedPfe;
            }));

            res.json(populatedPfes);
        });
    } catch (error) {
        console.error('Error fetching student\'s PFE:', error);
        res.status(500).json({ error: 'Failed to fetch student\'s PFE' });
    }
});

app.put('/inscrire',(req,res)=>{
    const {token}=req.cookies;
    const {id}=req.body;
    
    if(token){
        jwt.verify(token,'LFKJEN5dzjdnKDNZLJ526dd',async (err,info)=>{
            if(err) throw err;

            const doc=await PFEs.findById(id)
            doc.valider=false
            doc.inscrie=true
            doc.inscrire=info.id
            doc.save()
            res.status(200).json(doc)
        })
    }else{
        res.json(false)
    }
})


app.post('/logout',(req,res)=>{
    res.cookie('token','').json("ok")
})


app.get('/refrech',(req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,'LFKJEN5dzjdnKDNZLJ526dd',async (err,info)=>{
            if(err) throw err;

            res.status(200).json(info)
        })
    }else{
        res.json(false)
    }
})


//infos entreprises
app.post("/addEntreprise",async (req,res)=>{
    
    const {token}=req.cookies;
    console.log(token);
    jwt.verify(token,'LFKJEN5dzjdnKDNZLJ526dd',{},async (err,info)=>{


        const {nom,secteur,Representant,emailRep,numeroRep,Localisation,email,numero}=req.body
        const infosEntreprise=await entreprise.create({
            nom,
            secteur,
            Representant,
            emailRep,
            numeroRep,
            Localisation,
            email,
            numero
        })
        res.status(200).json(infosEntreprise) 
    })
    
});

app.get('/listeEntreprise',async (req,res)=>{
    const entreprises = await entreprise.find();
    res.status(200).json(entreprises);
});
app.get('/listUsers',async (req,res)=>{
    const users = await user.find();
    res.status(200).json(users);
});
//  app.get('/Admin/listPfes',async (req,res)=>{
//          const pfes = await PFEs.find().populate('author');
//     res.status(200).json(pfes);
//  });
app.get('/Admin/listPfes', async (req, res) => {
    try {
        const pfes = await PFEs.find().populate('author');

        // Populate the entreprise field with the name of the enterprise
        const populatedPfes = await Promise.all(pfes.map(async (pfe) => {
            const populatedPfe = pfe.toObject();
            if (populatedPfe.entreprise) {
                const enterprise = await entreprise.findById(populatedPfe.entreprise);
                if (enterprise) {
                    populatedPfe.entreprise = enterprise.nom;
                }
            }
            return populatedPfe;
        }));

        res.status(200).json(populatedPfes);
    } catch (error) {
        console.error('Error fetching PFEs:', error);
        res.status(500).json({ error: 'Failed to fetch PFEs' });
    }
});


app.put("/Admin/updateEntreprise/:id",async (req,res)=>{
    
    const {token}=req.cookies;
    const body=req.body;

    jwt.verify(token,'LFKJEN5dzjdnKDNZLJ526dd',{},async (err,info)=>{


        const entre = await entreprise.findById(req.params._id);
        if(!entreprise){
            res.status(404);
        }
        entre.nom=body.nom
        entre.secteur=body.secteur
        entre.Representant=body.Representant
        entre.emailRep=body.emailRep
        entre.numeroRep=body.numeroRep        
        entre.Localisation=body.Localisation
        entre.email=body.email
        entre.numero=body.numero

        entre.save()
        
        res.json(entre);
    })
    
});






app.listen(4000)
