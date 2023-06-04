const{response,request}=require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');





const usuariosGet = async(req=request, res=response) =>{
  
  const {limite = 5,desde =0}=req.query;
  const query={estado:true};
  // const usuario = await Usuario.find()
  //   .skip(Number(desde))
  //   .limit(Number(limite)); 
  
  const[total,usuarios]=await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ]);
  
  res.json({
     total,
     usuarios
    });
  }  

const usuariosPost = async(req, res=response) =>{
  

  
  const {nombre,correo,password,rol}= req.body;
  const usuario=new Usuario({nombre,correo,password,rol});

  //Verificar si el correo existe
 

  //Encriptar la contrasena
 const salt = bcryptjs.genSaltSync();
 usuario.password = bcryptjs.hashSync(password,salt);
  //Guardar en BD

  await usuario.save();
  
  res.json({
     usuario
    });
  }


  const usuariosPut= async(req, res=response) =>{
    
    const {id}=req.params;
    const{_id,password,google,correo, ...resto} = req.body;

    //Todo validar contra la base de datos
    if(password){
      //encontras el password
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto,{new:true});
    
    res.json({
     msg: 'Put API',
     usuario
    });
  }

  const usuariosDelete=async(req, res=response) =>{
    
    const {id} = req.params;
    // const uid=req.uid;

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    const usuarioAutenticado = req.usuario;

    res.json({usuario,usuarioAutenticado});
  }

  const usuariosPatch=(req, res=response) =>{
    res.json({
     msg: 'patch'
    });
  }


  

  module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch,
  }