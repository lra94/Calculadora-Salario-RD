const form = document.querySelector('form')
const btnCalcular = document.getElementById('btn-calcular')
const inputCalcular =document.getElementById('salario')
const pSFS = 0.0304
const pAFP = 0.0287
let isr = 0
//const isr = ()=>{}
const c = console.log

const meses = 12
let salarioAnual

//Funcion Calculo ISR segun DGI actualizado en fecha Enero/17/2022...
const calcularISR = (sAnual) =>{
    if (sAnual <= 416220.00) {
        isr = 0.00
        c(`ISR = ${isr}`) 
    }

    if (sAnual >= 416220.01 && sAnual <= 624329.00) {
        let x = sAnual - 416220.01
      //  c(`X es: ${x}`)
        let sfs = (sMensual * pSFS)
        isr = Math.round((x * 0.15) / 12) 
        c(`ISR = ${isr}`) 
    }

    if (sAnual >= 624329.01 && sAnual <= 867123.00) {
        let x = sAnual - 624329.01
        //c(`X es: ${x}`)
        isr = Math.round(((x * 0.20) + 31216.00 )/ 12)
        c(`ISR = ${isr}`) 
    }

    if (sAnual >= 867123.01) {
        let x = sAnual - 867123.01
        //c(`X es: ${x}`)
        isr = Math.round(((x * 0.25) + 79776.00 )/ 12)
        c(`ISR = ${isr}`) 
    }
}

//Funcion calculo SFS...
const calcularSFS = (sMensual) =>{
    let sfs = sMensual * pSFS
    if (sfs < 4742.41) {
        c(`SFS ${sfs}`)
    }else{
        c(`SFS ${4742.40}`)
    }
}

//Funcion calculo AFP...
const calcularAFP = (sMensual) =>{
    let afp = sMensual * pAFP
    if (afp < 8954.40) {
        c(`AFP ${afp}`)
    }else{
        c(`AFP ${8954.40}`)
    }
}



btnCalcular.addEventListener('click',(e) => {

    salarioAnual = Number(inputCalcular.value) * meses
    c(`Salario mensual: ${inputCalcular.value} Salario anual: ${salarioAnual}`)
    calcularISR(salarioAnual)
    calcularSFS(Number(inputCalcular.value))
    calcularAFP(Number(inputCalcular.value))

   e.preventDefault()

})





