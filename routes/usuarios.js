const{Router} = require('express');
const{check}=require('express-validator');


const{validarCampos}=require('../middlewares/validar-campos');
const { esRolevalido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const{usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch}=require('../controllers/usuarios');


const router = Router();

router.get('/',usuariosGet);

router.put('/:id',[
  check('id','No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRolevalido),
  validarCampos
],usuariosPut);

router.post('/',[
  check('nombre','el nombre es obligatorio').not().isEmpty(),
  check('password','el password debe ser mayor a 6 letras').isLength({min:6}),
  check('correo','el correo no es valido').isEmail(),
  check('correo').custom(emailExiste),
  // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('rol').custom(esRolevalido),
  validarCampos
],usuariosPost);



router.delete('/:id',usuariosDelete);


router.patch('/',usuariosPatch);


module.exports=router;