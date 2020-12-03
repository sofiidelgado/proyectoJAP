var currentProductsArray = [];
const ORDER_ASC_BY_COST = "PRECIOASC";
const ORDER_DESC_BY_COST= "PRECIODESC";
const ORDER_BY_PROD_SOLDCOUNT = "Relev.";
const ORDER_ASC_BY_NAME = "AZ";
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

//Función para mostrar la lista de productos traída del JSON
function showProductsList() {
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];
        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
        ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {

            htmlContentToAppend += `
            <div class="card-group">
            <div class="card-img-top col-16" style="width: 22rem;">
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="card-body">
                        <img src="` + product.imgSrc + `" alt="card image cap" class="card-img-top">    
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + product.description +`</p>
                        <p class="mb-1">` + product.currency + " " + product.cost +`</p>
                
                </div>
            </a>
            </div>
            </div>
            `;
        };

    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }};

//Función que ordena la lista de productos dependiendo de si el criterio es por precio o por productos vendidos.
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            console.log(a.cost, b.cost);
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_SOLDCOUNT) {
        result = array.sort(function (a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if (aSoldCount > bSoldCount) { return -1; }
            if (aSoldCount < bSoldCount) { return 1; }
            return 0;
        });
    }

    return result;
}



//Función para mostrar la lista de productos ordenados
function sortAndShowProducts(sortCriteria, productsArray) {
        currentSortCriteria = sortCriteria;
    
        if (productsArray != undefined) {
            currentProductsArray = productsArray;
        }
    
        currenltProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
        showProductsList(); };
    

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            console.log(resultObj);
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    //Eventos para los botones de ordenamiento
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
    });

//Evento para filtrar
    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por costo
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });
//Evento para borrar el filtro
document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCostMin").value = "";
    document.getElementById("rangeFilterCostMax").value = "";

    minCost = undefined;
    maxCost = undefined;

    showProductsList();
});
});