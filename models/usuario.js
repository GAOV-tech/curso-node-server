const{Schema,model}=require('mongoose');

const UsuarioSchema = Schema({

nombre:{
    type:String,
    required:[true, 'El nombre es obligatorio']
},

correo:{
    type:String,
    required:[true, 'El correo es obligatorio'],
    unique:true
},

password:{
    type:String,
    required:[true, 'El contraeña es obligatorio'],
    unique:true
},

img:{
    type:String,
},

rol:{
    type:String,
    require:true,
    emun:['ADMIN_ROLE','USER_ROLE']
},

estado:{
    type:String,
    default:true
},

google:{
    type:Boolean,
    default:false
},


});

UsuarioSchema.methods.toJSON = function(){
    const{__v,password,...usuario}=this.toObject();
    return usuario;
}

module.exports=model('Usuario',UsuarioSchema);