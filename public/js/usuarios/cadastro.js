document.addEventListener("DOMContentLoaded", function() {

    //aqui dentro apenas é executado após o carregamento
    //da html
    document.getElementById("btn-cadastrar").
    addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("input-nome").style.borderColor = "#ced4da";
        document.getElementById("input-email").style.borderColor = "#ced4da";
        document.getElementById("input-senha").style.borderColor = "#ced4da";
        document.getElementById("select-perfil").style.borderColor = "#ced4da";
    }

    function cadastrar() {

        limparValidacao();

        //lê os campos do html
        let inputNome = document.getElementById("input-nome");
        let inputEmail = document.getElementById("input-email");
        let inputSenha = document.getElementById("input-senha");
        let selPerfil = document.getElementById("select-perfil");
        let cbAtivo = document.getElementById("cb-ativo");
        let listaValidacao = [];

        //adiciona os campos preenchidos incorretamente 
        //em uma lista para serem destacados no html
        if(inputNome.value == "")
            listaValidacao.push("input-nome");
        if(inputEmail.value == "")
            listaValidacao.push("input-email");
        if(inputSenha.value == "")
            listaValidacao.push("input-senha");
        if(selPerfil.value == "0")
            listaValidacao.push("select-perfil");

        if(listaValidacao.length == 0) {
            //prosseguir com o cadastro (validação ok!)

            //montagem do objeto que será enviado ao backend
            let obj = {
                nome: inputNome.value,
                email: inputEmail.value,
                senha: inputSenha.value,
                perfil: selPerfil.value,
                ativo: cbAtivo.checked
            }
            fetch('/usuario/cadastro', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            .then(function(resposta) {
                return resposta.json();
            })
            .then(function(corpoResposta) {
                if(corpoResposta.ok) {
                    alert(corpoResposta.msg);
                }
                else {
                    console.error(corpoResposta.msg);
                }
            })

        }
        else {
            //destacar os campos com erro
            destacarCampos(listaValidacao);
        }

    }

    function destacarCampos(lista) {

        for(let i = 0; i < lista.length; i++) {      
            let campo = document.getElementById(lista[i]);
            campo.style.borderColor = "red";
        }

        alert("Preencha corretamente os campos indicados!");
    }

})
