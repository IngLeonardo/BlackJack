
// 2C - two of clubs( treboles )
// 2D - two of diamonds ( diamantes )
// 2H - two of hearts ( corazónes )
// 2S - two of spades ( espadas )

// Se crean los siguientes arreglos, el primero esta en vacio y 
// es al cual se le hara el llenado de datos, los otros dos contaran
// con datos, y se manipularan a traves del ciclo for para poder mezclar 
// estos arreglos.

const miModulo = (()=>{
  'use strict'
  let deck                = [];
  const tiposCartas       = ['C','D','H','S'],
        cartasEspeciales  = ['A','J','Q','K'];
  
  // let puntosJugador     = 0,
  //     puntosComputadora = 0;
  let puntosJugadores = [];
  
  // Referencias del HTML
  const btnNuevo              = document.querySelector('#btnNuevo'),
        btnPedir              = document.querySelector('#btnPedir'),
        btnDetener            = document.querySelector('#btnDetener'),
        divsmall              = document.querySelectorAll('small'),
        divCartasJugadores    = document.querySelectorAll('.divCartas');
        // divCartasJugador      = document.querySelector('#jugador-cartas'),
        // divCartasComputadora  = document.querySelector('#computadora-cartas');
  
  /* *************
    En la siguiente funcion se realizaron varios for con la unica intencion
    de mezclar los tipos de cartas VS los tipos de cartas especuales como son la
    Q,K,J y A , de esta manera conseguir una baraja completa, adicionalme se hace
    uso de una libreria de terceros para revolver las cartas y conseguir una 
    baraja mas random 
  */
 //---------------------------------------------------------------
  //Funcion para iniciar el juego.
  //--------------------------------------------------------------
  const inicializarJuego = (numJugadores = 2)=>{
    deck = crearDeck();
    puntosJugadores = [];
    for(let i = 0 ; i < numJugadores; i++){
      puntosJugadores.push(0);
    }

    divsmall.forEach(elem => elem.innerText = 0);
    // divsmall[0].innerText = 0;
    // divsmall[1].innerText = 0;
    
    divCartasJugadores.forEach(elem => elem.innerHTML = '');
  
    btnPedir.disabled = false;
    btnDetener.disabled = false;

  }
  const crearDeck = ()=>{
    deck = [];
    //con el siguiente for iteramos y mezclamos los numero VS los tipos de carta.
    for(let i = 2; i<=10; i++){
      for(let tipoCarta of tiposCartas){
        deck.push(i + tipoCarta);
      }
    }
    //con el siguiente for iteramos y mezclamos los tipos de carta VS las
    //cartas especiales que hay en una baraja.
    for(let tipoCarta of tiposCartas){
      for(let cartaEspecial of cartasEspeciales){
        deck.push(cartaEspecial +  tipoCarta);
      }
    }
  
      //en el siguiente bloque de codigo hacemos uso de la libreria UnderscoreJS
      //para revolver la baraja y asi tener una baraja mas random.
      //deck = _.shuffle(deck);//con _.shuffle(), logramos revolver la baraja - siguiente linea esta optimizado.
      return _.shuffle(deck);
  }
  //------------------------------------------------------
  //La siguiente funcion me permitira tomar una carta de la baraja.
  //-------------------------------------------------------
  const pedirCarta = ()=>{
    if(deck.length === 0){
      throw 'no hay cartas en el deck';
    }
    //const carta = deck.pop(); Se realiza la optimizacion en la siguiente linea.
    return deck.pop();
  
  }
  //-------------------------------------------------------
  /*La siguiente funcion me permitira evaluar la carta que pedi y definir
    que valor tiene.*/
  //-----------------------------------------------------
  const valorCarta = (carta)=>{
    const valor = carta.substring(0, carta.length - 1);
    // if(isNaN(valor)){
    //   puntos = (valor ==='A') ? 11 : 10;
    // }
    // else{
    //   puntos = valor * 1;
    // }
    // El siguiente codigo es la simplificacion del codigo anterior, que se 
    // encuentra comentado, se simplifica con operador ternario.
    return  (isNaN(valor)) ? 
              (valor ==='A') ? 11 : 10
            : valor * 1;
  }
  
//********* Acumular puntos ******************
//El turno: el primer cero = primer jugador y el ultimo cero = computadora.
  const acumularPuntos = (turno, carta)=>{

    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    divsmall[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
    // puntosComputadora = puntosComputadora + valorCarta(carta);
    // divsmall[1].innerText = puntosComputadora;

  }
  //------ Crear carta ------------------------
  const crearCarta = (turno, carta)=>{
    const imgCarta = document.createElement('img');
          imgCarta.src = `./assets/cartas/${carta}.png`;
          imgCarta.classList.add('carta');
          divCartasJugadores[turno].append(imgCarta);
  }

  const determinarGanador = ()=>{

    const[puntosMinimos, puntosComputadora] = puntosJugadores
    
    //se usa la funcion setTimeout(), para dar una pausa para que se muestren las alertas despues de la seleccion de cartas.
    setTimeout(()=>{
      const puntosJugador = acumularPuntos(0, '');

      if(puntosComputadora === puntosMinimos){
        alert('Nadie gana, empate');
      }else if(puntosMinimos > 21)
        alert('Perdiste, computadora gana');
      else if(puntosComputadora > 21){
        alert('Ganaste, jugador gana');
      }
      else if(puntosJugador > puntosComputadora && puntosMinimos <= 21){
          alert('Ganaste, jugador gana');
      }
      else{
        alert('Perdiste, computadora gana');
      }
    },40);
  }
  //----------- Turno de la computadora -----------------
  const turnoComputadora = (puntosMinimos)=>{
    let puntosComputadora = 0;
    do {

      const carta = pedirCarta();
      const turnoComputadora = puntosJugadores.length-1;
      puntosComputadora = acumularPuntos(turnoComputadora,carta)  
      acumularPuntos(turnoComputadora ,carta);
      // puntosComputadora = puntosComputadora + valorCarta(carta);
      // divsmall[1].innerText = puntosComputadora;

      crearCarta(turnoComputadora, carta);
      // const imgCarta = document.createElement('img');
      // imgCarta.src = `./assets/cartas/${carta}.png`;
      // imgCarta.classList.add('carta');
      // divCartasComputadora.append(imgCarta);
      break;
    } while((puntosComputadora < puntosMinimos) && puntosMinimos <= 21 );
      determinarGanador();
    
    
  }
  //-------------------------------------------------------
  //-----------
  //Eventos
  //-----------
  //----Inicio de la funcionalidad del boton pedir carta-------
  btnPedir.addEventListener('click', ()=>{
    const carta = pedirCarta();//invocamos la funcion y el valor que traiga se lo asignamos a la constante.
    //la variable puntosJugador se iguala asi misma para ir haciendo un acumulado de puntos segun el valor de la carta
    const puntosJugador = acumularPuntos(0, carta);
    crearCarta(0, carta);
    // puntosJugador = puntosJugador + valorCarta(carta);
    /**En la parte inicial se referencia el spam del HTML con la variable divsmall pero la referencia con el querySelectorAll 
    me retorna todas las etiquetas small que existan en el HTML, por eso se usar el divsmall[0] ya que de esa manera se indica
    que queiro el primer small que haya en HTML. **/
    // divsmall[0].innerText = puntosJugador;divsmall[0].innerText = puntosJugador;
    
    //-------Bloque usado para crear las cartas en pantalla------------------------
    // Creacion de un elemento HTML desde javascript
    // paso 1: En este paso se crea la etiqueta <img> sin propiedades
    //const imgCarta = document.createElement('img');
    // paso 2: Debemos empezar a crear cada una de la propiedades que van dentro
    // de la etiqueta <img>.
    //En la siguiente linea creamos la propiedad SRC:
    //imgCarta.src = `./assets/cartas/${carta}.png`;
    //En la siguiente linea creamos la propiedad CLASS:
    //imgCarta.classList.add('carta')
    //En la siguiente linea insertamos la etiqueta creada con sus propiedades
    //dentro del div del HTML:
    //divCartasJugador.append(imgCarta)
    //Las anteriores lineas de codigo javascript se usaron para crear 
    //una etiqueta IMG como se ve a continuacion:
    //<img class="carta" src="./assets/cartas/2C.png">
    //---------------------------------------------------------------------------------
  
    if(puntosJugador > 21){
      console.warn('perdiste');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
  
    }
    else if(puntosJugador === 21){
      console.warn('!Genial ya tienes 21 puntos¡');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
    
  });
  
  //---- Inicio de la funcionalidad del boton detener -----------
  btnDetener.addEventListener('click',()=>{
    const puntosJugador = acumularPuntos(0,'')
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    
    turnoComputadora(puntosJugador);
  });
  
  //--- Inicio de la funcionalidad del boton Nuevo juego -----------
  btnNuevo.addEventListener('click',()=>{
    inicializarJuego();
  });

  return{
    nuevoJuego : inicializarJuego
  }

})();


