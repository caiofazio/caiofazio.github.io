let parlamentares = [];
let ids = [];
let a;
let partidos = new Map();
function contar(data) {
    if (data['ListaParlamentarEmExercicio.Parlamentares.Parlamentar.IdentificacaoParlamentar.CodigoParlamentar']) {
    id = data['ListaParlamentarEmExercicio.Parlamentares.Parlamentar.IdentificacaoParlamentar.CodigoParlamentar']
    if (!ids.find(element => element == id)) {
        ids.push(data['ListaParlamentarEmExercicio.Parlamentares.Parlamentar.IdentificacaoParlamentar.CodigoParlamentar'])
        console.log(data['ListaParlamentarEmExercicio.Parlamentares.Parlamentar.IdentificacaoParlamentar.SiglaPartidoParlamentar'])
        parlamentares.push(data)
        }
    }
}
function LoadData() {
    d3.dsv(';', "ListaParlamentarEmExercicio.csv", (data)=>{contar(data)})
}

function GetChildrenIndex(element) {
    var i = 0;
    while( (element = element.previousElementSibling) != null ) {
      i++;
    }
    return i;
}

function openPage(index, partido) {
    console.log(index, partido)
    if (partido == 'PODE') partido = "PODEMOS"
    partido = parlamentares.filter(element => element['ListaParlamentarEmExercicio.Parlamentares.Parlamentar.IdentificacaoParlamentar.SiglaPartidoParlamentar'] == partido)
    if (partido.length != 0) {
    senador = partido[index] 
        if (senador) {
            setPageInfo(senador)
        }else {
            console.log()
        }
    } else {
        setError()
    }
}

function setPageInfo(senador) {
    d3.select('img').attr('src', senador['ListaParlamentarEmExercicio.Parlamentares.Parlamentar.IdentificacaoParlamentar.UrlFotoParlamentar'])
    d3.select('h1').text(senador['ListaParlamentarEmExercicio.Parlamentares.Parlamentar.IdentificacaoParlamentar.NomeParlamentar'])
    d3.select('h2').text(senador['ListaParlamentarEmExercicio.Parlamentares.Parlamentar.IdentificacaoParlamentar.SiglaPartidoParlamentar'])
}

function setError() {
    d3.select('img').attr('src', '')
    d3.select('h1').text('Não encontrado')
    d3.select('h2').text('Não encontrado')
}

LoadData()

window.onload = (event) => {
    console.log('page is fully loaded');
    d3.selectAll('circle').on('mouseover', function (d, i) {
        d3.select(this).attr('stroke', 'black').attr('stroke-width', 3)
    }).on('mouseout',function (d, i) {
        d3.select(this).attr('stroke', 'black').attr('stroke-width', 0)
    }) 
    d3.selectAll('circle')
    .on("click", function(d,i){
        a = this;
        openPage(GetChildrenIndex(this) - 1, a.parentElement.id.split('_')[1].toUpperCase())
    })
    };

