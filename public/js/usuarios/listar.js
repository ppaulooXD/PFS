document.addEventListener("DOMContentLoaded", function () {
 
        const btnAlterar = document.getElementById("btn-alterar");
        if (btnAlterar) {
            btnAlterar.addEventListener("click", function(event) {
                event.preventDefault();
    
                const id = document.getElementById("input-id").value;
                const nome = document.getElementById("input-nome").value;
                const email = document.getElementById("input-email").value;
                const senha = document.getElementById("input-senha").value;
                const perfil = document.getElementById("select-perfil").value;
                const ativo = document.getElementById("cb-ativo").checked;

                if (!nome || !email || !senha || perfil === "0") {
                    alert("Por favor, preencha todos os campos obrigatórios!");
                    return;
                }
 
                fetch("/usuario/alterar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ 
                        id: id,
                        nome: nome,
                        email: email,
                        senha: senha,
                        perfil: perfil,
                        ativo: ativo 
                    })
                })
                .then(response => response.json())
                .then(data => {
                    alert(data.msg);
                    if (data.ok) {
                        window.location.href = "/usuario";
                    }
                })
                .catch(error => {
                    console.error("Erro:", error);
                    alert("Ocorreu um erro ao alterar o usuário!");
                });
            });
        }
        const btnsExclusao = document.querySelectorAll(".btn-exclusao");
    for (let btn of btnsExclusao) {
        btn.addEventListener("click", excluir);
    }

    function excluir() {
        const id = this.dataset.id;
        const nome = this.dataset.nome;

        if (confirm(`Deseja realmente excluir o Usuário ${nome}?`)) {
            const that = this;
            fetch("/usuario/excluir/" + id, {
                method: "GET"
            })
            .then(resposta => resposta.json())
            .then(dados => {
                alert(dados.msg);
                if (dados.ok) {
                    that.parentElement.parentElement.remove();
                }
            })
            .catch(erro => {
                console.log(erro);
            });
        }
    }

});
