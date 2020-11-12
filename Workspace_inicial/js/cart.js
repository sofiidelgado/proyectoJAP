const ARTICLES_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";
let porcentaje = 0 ;

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes. 
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            console.log(resultObj); 
            cart = resultObj.data
            console.log(cart);
    
            articulo = cart.articles;
            console.log(articulo);
    
            let htmlContentToAppend = ""; 
            for(let i=0; i < articulo.length; i++){
            let article = articulo[i];
            htmlContentToAppend += `
           <div class="row">
          
            <p class="col"><img src="` + article.src + `" class="img-thumbnail"></p>
            <p class="col">`+ article.name +`</p>
            <p class="col" id="unitCost">` + article.currency + ` ` + article.unitCost + `</p>
            
            <p class="col"><input type="number" class="form-control" min= 0 name="cantidad" value="`+ article.count + `" id="countInput"></input></p>
            <div class="invalid-feedback">
                    El número de artículos debe ser mayor a 0.
                  </div>
            <p class="col"><span id="subtotal">` + article.currency + ` ` + article.unitCost * article.count + `</span></p>
            
            
            </div>
            <hr>
            
            
            `;
            document.getElementById("cart").innerHTML = htmlContentToAppend;
        //document.getElementById("totalCost").innerHTML += article.unitCost * article.count;
        document.getElementById("subtotal-to-show").innerHTML += article.unitCost * article.count;

        }
        
    };

        function showSubtotal(){
            for(let i=0; i < articulo.length; i++){
                let article = articulo[i];
                console.log(articulo)
            let cantidad =  document.getElementById("countInput").value;
            let subtotalHTML = document.getElementById("subtotal");
            let subtotalToShow = Math.round(article.unitCost * cantidad);

            subtotalHTML.innerHTML = article.currency + " " + subtotalToShow ;   
        };
        };

        function SubtotalYTotal(){
            for(let i=0; i < articulo.length; i++){
                
            let article = articulo[i];
            //let envio = 0;
            let cantidad =  document.getElementById("countInput").value;
            let unitProductCostHTML = document.getElementById("subtotal-to-show");
            //let totalCostHTML = document.getElementById("totalCost");
        
            let unitCostToShow = Math.round(article.unitCost * cantidad);
            //let totalCostToShow = envio + (Math.round(article.unitCost * cantidad));
        
            unitProductCostHTML.innerHTML = article.currency + " " + unitCostToShow;
           
            //totalCostHTML.innerHTML = article.currency + " " + totalCostToShow;
        }; 
    };
//Costo del envío
    function calcularEnvio() {
        for(let i=0; i < articulo.length; i++){
            let article = articulo[i];
            
        let costoEnvioHTML = document.getElementById("envio");
        let totalCostHTML = document.getElementById("totalCost");
        let cantidad =  document.getElementById("countInput").value;

        let unitCostToShow = Math.round(article.unitCost * cantidad);
        let costoEnvio = Math.round(unitCostToShow * porcentaje);

         costoEnvioHTML.innerHTML = article.currency + " " + costoEnvio;

         

         totalCostHTML.innerHTML = article.currency + " " + Math.round(unitCostToShow + costoEnvio);
        };
        };
    //Eventos change para subtotal
        document.getElementById("countInput").addEventListener("change", function(){
            showSubtotal();
            
        });

        document.getElementById("countInput").addEventListener("change", function(){
            SubtotalYTotal();
        });

    //Para envío
    document.getElementById("premium").addEventListener("change", function(){
        porcentaje = 0.15;
        calcularEnvio();
    });
    
    document.getElementById("express").addEventListener("change", function(){
        porcentaje = 0.07;
        calcularEnvio();
    });

    document.getElementById("estandar").addEventListener("change", function(){
        porcentaje = 0.05;
        calcularEnvio();
    });
      
});
//VALIDACIONES INTENTO NÚMERO MIL
document.getElementById("finalizarCompra").addEventListener("click", function() {
    
    var cant = document.getElementById("countInput").value
    var tarj = document.getElementById("tarjeta").checked == false;
    var transf = document.getElementById("transferencia").checked == false;
    var efec = document.getElementById("efectivo").checked == false;
    var pre = document.getElementById("premium").checked == false;
    var exp = document.getElementById("express").checked == false;
    var stan = document.getElementById("estandar").checked == false;

    if (cant < 1 || tarj ^ transf ^ efec || pre ^ exp ^ stan) {
        alert("¡Ha ocurrido un error! verifica que todos los pasos se hayan completado ") }
        else { alert("¡Su compra ha sido procesada exitosamente!");
    };

});
});