const express = require("express"); // En esta línea, se importa el módulo express para poder utilizarlo en nuestra aplicación. Express es un framework de Node.js que facilita la creación de servidores web.

const app = express(); // Se crea una instancia de la aplicación Express.

const port = 3000; // Se define el puerto en el cual el servidor estará escuchando las solicitudes.

app.use(express.json()); //Se indica a la aplicación Express que debe parsear los cuerpos de las solicitudes como JSON.

app.post("/", (req, res) => {
  //Se define una ruta POST en la raíz del servidor. Cuando se reciba una solicitud POST en esta ruta, se ejecutará la función definida.

  let data = req.body.inputs;
  let nombre = data.nombre;
  let celular = data.celular;
  let correo = data.email;
  let envio = data.envio;
  let ciudad = data.ciudad;
  let valor = data.valor;
  let producto = data.dinamicos.dinamico32P0O11.trim().toLowerCase();
  let bebida = data.dinamicos.dinamicoHpOQt12.trim().toLowerCase();
  let direccion = data.dinamicos.dinamicoR2Ic113.trim().toLowerCase();
  let cuantas = data.dinamicos.dinamicoNuBCO14.trim().toLowerCase();
  let acciones = [];

  //7. Se define un array vacío llamado acciones donde se almacenarán las acciones a realizar en respuesta a la solicitud.

  //En las líneas siguientes se extraen los datos enviados en el cuerpo de la solicitud (req.body) y se asignan a variables locales para su posterior uso.

  console.log("Los datos son: ", data);

  const productosValidos = ["sencilla", "doble carne", "corral"];
  const bebidasValidas = ["agua", "jugo", "cocacola"];
  const cantidadesValidas = [
    "1 sencilla",
    "2 sencillas",
    "2 sencillas, 1 doble carne",
    "1 doble carne",
    "3 sencillas, 1 doble carne",
    "4 sencillas, 2 doble carne",
    " 3 doble carne, 1 corral",
    "4 doble carne, 2 corrales",
    "1 corral, 1 sencilla",
    "2 corrales, 1 doble carne",
    "3 corrales, 2 doble carne",
  ];

  const sencillaValidas = [
    "1 sencilla",
    "2 sencillas",
    "3 sencillas",
    "4 sencillas",
  ];

  const dobleCarneValidas = [
    "1 doble carne",
    "2 doble carne",
    "3 doble carne",
    "4 doble carne",
  ];

  const corralValidas = [
    "1 doble carne",
    "2 doble carne",
    "3 doble carne",
    "4 doble carne",
  ];

  const valoresProductos = {
    hamburguesa: 20000,
    pizza: 9000,
    ensalada: 8000,
    pasta: 15000,
  };

  const valoresBebidas = {
    agua: 2000,
    jugo: 5000,
    cocacola: 4000,
  };

  const cantidadProductos = {
    sencilla: 20.0,
    doble_queso: 24.0,
    corral: 30.0,
  };

  //Se definen dos estructuras de datos: productosValidos es un array con los productos válidos y valoresProductos es un objeto que asocia cada producto con su valor.

  const valorProducto = valoresProductos[producto];
  const valorBebida = valoresBebidas[bebida];
  const totalValor = valorProducto + valorBebida;

  const cantidad = parseInt(cantidadProductos[producto], 3);

  if (isNaN(cantidad) || cantidad <= 0) {
    console.log("Cantidad inválida");
    acciones.push({
      type: "sendText",
      text: `La cantidad "${cantidadProductos[producto]}" no es válida. Por favor, ingresa una cantidad válida.`,
    });
  }
  //Se obtiene el valor del producto seleccionado a partir del objeto valoresProductos.

  // ...

  if (
    productosValidos.includes(producto) &&
    bebidasValidas.includes(bebida) &&
    cantidadesValidas.includes(cantidadProductos[producto])
  ) {
    // ...
  } else {
    console.log("Cantidad inválida");
    acciones.push({
      type: "sendText",
      text: `La cantidad "${cantidadProductos[producto]}" no es válida para el producto "${producto}". Por favor, ingresa una cantidad válida.`,
    });
  }

  if (productosValidos.includes(producto) && bebidasValidas.includes(bebida)) {
    console.log("Producto válido: " + producto);
    //Se verifica si el producto seleccionado está dentro de los productos válidos.
    acciones.push(
      {
        type: "sendText",
        text: `*Este es tu pedido*: <br>
        - La comida es *${producto}*, el valor es _${valorProducto} COP_<br>
        - Tu bebida es *${bebida}* y el valor es de _${valorBebida} COP_<br>
        - El total será de *${totalValor}* <br>
        - será enviado a la ciudad de *${ciudad}*, en la dirección *${direccion}*.<br>`,
      },
      {
        type: "sendText",
        text: `*Datos del usuario*: <br> 
      Nombre: ${nombre}<br>
      Celular: ${celular}<br>
      dirección: ${direccion}`,
      },
    );
  } else {
    console.log("Producto inválido: ");
    acciones.push(
      {
        type: "sendText",
        text: `El producto "${producto && bebida}" no existe en nuestro catálogo, escribe la palabra "Volver" e inténtalo de nuevo, recuerda que tenemos "${productosValidos.join(", ")}" y "${bebidasValidas.join(", ")}"`,
      },
      {
        type: "teamDelegate",
        id_team: 17483,
      },
    );
  }

  //Dependiendo de si el producto es válido o no, se añade una acción al array acciones con un mensaje personalizado.

  res.json({
    status: 1,
    status_message: "Ok",
    data: {
      actions: acciones,
    },
  });
});

//Finalmente, se envía una respuesta JSON al cliente con un objeto que contiene un status, un mensaje de estado y las acciones a realizar.

console.log("fin");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//El servidor Express empieza a escuchar en el puerto definido y se muestra un mensaje indicando que la aplicación está escuchando en ese puerto.
