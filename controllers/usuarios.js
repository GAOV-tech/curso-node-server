const{response,request}=require('express');


const usuariosGet = (req, res=response) =>{
  const {q,nombre,apikey} = req.query;  
  
  res.json({
     msg: 'get API-controlador',
     q,
     nombre,
     apikey
    });
  }

const usuariosPost = (req, res=response) =>{
  
  const{nombre,edad} = req.body;

  
  res.json({
     msg: 'Post API-controlador',
     nombre,
     edad
    });
  }


  const usuariosPut=(req, res=response) =>{
    
    const id=req.params.id;
    
    res.json({
     msg: 'Put API',
     id
    });
  }

  const usuariosDelete=(req, res=response) =>{
    res.json({
     msg: 'delete API'
    });
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