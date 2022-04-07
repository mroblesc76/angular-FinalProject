// importacion de librerias
const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const jsonParser=bodyparser.json();

let respuesta = {
    error : false,
    codigo: 200,
    mensaje: ''
}

let items = [
    {
        codigo:"Chicago292Se2",
        nombre:"bike-Chicago292Se2",
        descripcion: "Bicicleta rigida básica",
        tipo:"Rigida",
        imagen:"../../../assets/bike-Chicago292Se2.jpg"
    },
    {
        codigo:"Lycan27Prime",
        nombre:"bike-Lycan27Prime",
        descripcion:"Bicicleta doble suspención básica",
        tipo:"Doble Suspención",
        imagen:"../../../assets/bike-Lycan27Prime.jpg"
    }
  ];


const app = express();

app.use(cors({
    origin:'*'
}));

// 
app.get('/',function(req, res){
    respuesta = {
        error : true,
        codigo: 200,
        mensaje: 'Inicio'
    };
    res.send(respuesta);
});

// obtiene todos los productos
app.get('/products', function(req, res){
    console.log('Consultando todos los productos.');
    respuesta = {
        error : false,
        codigo: 200,
        mensaje: items
    };
    res.send(respuesta);

});

// obtiene un producto por id
app.get('/product/:id', jsonParser, function(req, res){
    let id=req.params.id;
    console.log('servicio get id: '+id);
    respuesta = {
        error : false,
        codigo: 200,
        mensaje: items.find(element=>element.codigo==id)
    };
    res.send(respuesta);
});

// insertar producto
app.post('/product',jsonParser, function (req, res) {
    console.log(req.body);
  
    if(!req.body)
    {
        respuesta = 
        {
            error : false,
            codigo: 200,
            mensaje: 'Error creando el nuevo item.'
        };
    }
    else
    {
        items.push(req.body);
        respuesta = 
        {
            error : false,
            codigo: 200,
            mensaje: items
        };
    }
    res.send(respuesta);
});

// actualizar producto
app.put('/product/:id', jsonParser, function(req, res){
    //let arreglo=[];
    let id = req.params.id;
    
    // console.log('servicio put: '+id);
    
    items=items.map(resp=>{
        if (resp.codigo==id){
            resp.nombre=req.body.nombre,
            resp.descripcion=req.body.descripcion;
            resp.tipo=req.body.tipo;
            resp.imagen=req.body.imagen;
        }
        return resp;
    });

    respuesta = 
    {
        error : false,
        codigo: 200,
        mensaje: items.find(element=>element.codigo==id)
    };
    res.send(respuesta);
});

// elimina producto
app.delete('/product/:id',jsonParser, function (req, res) 
{
    let id=req.params.id;

    console.log('servicio delete: ', id)

    if(id === '') 
    {
        respuesta = 
        {
            error: true,
            codigo: 501,
            mensaje: 'Debe enviar un código de item para eliminar.'
        };
    }
    else 
    {
        items=items.filter((resp)=>resp.codigo!==id);

        respuesta = 
        {
            error: false,
            codigo: 200,
            mensaje: 'Producto Eliminado.'
        };
    }
    
    res.send(respuesta);
});

app.listen(4001, ()=> {console.log("api work.");})