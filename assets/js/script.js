//captura de elemento con JQUERY
$(document).ready(function(){
    $("#formH").submit(function(event){
        event.preventDefault();
       
        let reg = /^\d+$/;
        let numeroHero = $("#numero").val();

        //Entrega de informacion de superhero en la carta
        if (reg.test(numeroHero) && 1 <= numeroHero && numeroHero<=732){

          $.ajax({
            type: "Get",
            url: `https://www.superheroapi.com/api.php/1426847417697471/${numeroHero}`,
            dataType: "json",
            success: function (data) {
                let nombre = data.name;
                let imagen = data.image.url
                let conexiones = data.connections["group-affiliation"];
                let publicado = data.biography.publisher;
                let ocupacion = data.work.occupation;
                let primeraAparicion = data.biography["first-appearance"];
                let altura = data.appearance.height[0]+ " - " + data.appearance.height[1];
                let peso = data.appearance.weight[0]+ " - " + data.appearance.weight[1];
                let alianzas = data.biography.aliases;
                
                 $("#heroinfo").html(`
                <h4 class="text-center">SuperHero Encontrado</h4>
                  <div class="row mb-4 mx-sm-n5">
                    <div col-6 col-sm-6 mb-sm-1 mb-4 px-0">
                      <img id=imgSuperHero src="${imagen}">
                    </div>
                    <div id="letra" class="mt-5 col-sm 6 mb-sm1 mx-sm-auto ml-4 text-left px-5 px-sm-4">
                      <div class="card-body">
                        <h5 class="card-title">Nombre: ${nombre}</h5>
                        <p class="card-text">Conexiones: ${conexiones}</p>
                      
                      <ul>
                        <li>Publicado por: ${publicado}</li>
                        <li>Ocupación: ${ocupacion}</li>
                        <li>Primera Aparición: ${primeraAparicion}</li>
                        <li>Altura:  ${altura}</li>
                        <li>Peso:  ${peso}</li>
                        <li>Alianzas:  ${alianzas}</li>
                      </ul>
                    </div>
                  </div>`);

                  //Grafico
                  
                  let grafico = new CanvasJS.Chart("chartContainer",
                  {
                    title:{
                      text: `Estadisticas de Poder para ${nombre}`
                    },
                    legend: {
                      maxWidth: 350,
                      itemWidth: 120
                    },
                    data: [
                    {
                      type: "pie",
                      showInLegend: true,
                      legendText: "{indexLabel}",
                      dataPoints: [
                        {y: `${data.powerstats.intelligence}`, indexLabel: "Inteligencia"},
                        {y: `${data.powerstats.strength}`, indexLabel: "Fuerza"},
                        {y: `${data.powerstats.speed}`, indexLabel: "Velocidad"},
                        {y: `${data.powerstats.durability}`, indexLabel: "Durabilidad"},
                        {y: `${data.powerstats.power}`, indexLabel: "Poder"},
                        {y: `${data.powerstats.combat}`, indexLabel: "Combate"}
                      ]
                    }
                    ]
                  });
                  grafico.render();
            }
        });

          //Limpia formulario
          $("#numero")[0].reset();
        }else{
          alert("Debe ingresar un número entre 1 y 732")
          $("#numero")[0].reset();
        }

    });       
});
    
  





