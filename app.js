const form = document.querySelector('form')
const btnCalcular = document.getElementById('btn-calcular')
const inputCalcular =document.getElementById('salario')
const pSFS = 0.0304
const pAFP = 0.0287
let isr = 0
const meses = 12
let salarioAnual

const divTemplate = document.getElementById('template-div')
const template = document.getElementById('template-calculo').content
const fragment = document.createDocumentFragment()

const c = console.log

c(template)


//Funcion Calculo ISR segun DGI actualizado en fecha Enero/17/2022...
const calcularISR = (sAnual) =>{
    if (sAnual <= 416220.00) {
        isr = 0.00
    }

    if (sAnual >= 416220.01 && sAnual <= 624329.00) {
        let x = sAnual - 416220.01
      //  c(`X es: ${x}`)
        let sfs = (sMensual * pSFS)
        isr = Math.round((x * 0.15) / 12) 
    }

    if (sAnual >= 624329.01 && sAnual <= 867123.00) {
        let x = sAnual - 624329.01
        //c(`X es: ${x}`)
        isr = Math.round(((x * 0.20) + 31216.00 )/ 12)
    }

    if (sAnual >= 867123.01) {
        let x = sAnual - 867123.01
        //c(`X es: ${x}`)
        isr = Math.round(((x * 0.25) + 79776.00 )/ 12)
    }
    return isr
}

//Funcion calculo SFS...
const calcularSFS = (sMensual) =>{
    let sfs = sMensual * pSFS
    if (sfs > 4742.41) {
        sfs = 4742.40
    }
    return sfs
}

//Funcion calculo AFP...
const calcularAFP = (sMensual) =>{
    let afp = sMensual * pAFP
    if (afp > 8954.40) {
        afp = 8954.40
    }
    return afp
}

//Funcion Calculo Total Retenciopnes...
const calcularTotalRet = ()=>{
    let ttRet = calcularAFP(Number(inputCalcular.value)) + calcularSFS(Number(inputCalcular.value)) + calcularISR(salarioAnual)
  //  c(`Total retenciones : ${ttRet}`)
    return ttRet
}
//Funcion Calculo Salario Neto Mensual...
const calcularSNetoMensual = (salarioMensual) =>{
    let ttSalarioNetoMensual = salarioMensual - calcularTotalRet()
   // c(`Salario Neto Mensual ${ttSalarioNetoMensual}`)
    return ttSalarioNetoMensual
}
//Funcion Calculo Salario Neto Quincenal...
const calcularSNetoQuincenal = (salarioMensual) =>{
    let ttsNetoQuincenal = calcularSNetoMensual(salarioMensual) / 2
   // c(`Salario Neto Quincenal ${ttsNetoQuincenal}`)
    return ttsNetoQuincenal
}

btnCalcular.addEventListener('click',(e) => {

    
    salarioAnual = Number(inputCalcular.value) * meses
   // c(`Salario mensual: ${inputCalcular.value} Salario anual: ${salarioAnual}`)
   // calcularSNetoQuincenal(Number(inputCalcular.value))

    template.querySelector('#sfs').textContent = `Seguro Familiar de Salud (SFS): RD$${calcularSFS(Number(inputCalcular.value)).toFixed(2)}` 
    template.querySelector('#afp').textContent = `Administradora de Fondo de Pensiones (AFP): RD$${calcularAFP(Number(inputCalcular.value)).toFixed(2)}`
    template.querySelector('#isr').textContent = `Impuesto Sobre la Renta (ISR): RD$${calcularISR(salarioAnual).toFixed(2)}`
    template.querySelector('#ttr').textContent = `Total Retenciones: RD$${calcularTotalRet().toFixed(2)}`
    template.querySelector('#snm').textContent = `Salario Neto Mensual: RD$${calcularSNetoMensual(Number(inputCalcular.value)).toFixed(2)}`
    template.querySelector('#snq').textContent = `Salario Neto Quincenal: RD$${calcularSNetoQuincenal(Number(inputCalcular.value)).toFixed(2)}`

    
    const clone = template.cloneNode(true)
    fragment.appendChild(clone)

    divTemplate.appendChild(fragment)
    btnCalcular.disabled = true
    e.preventDefault()
   
})





