exports.menuDuck = () => {
    return `Olá! Eu sou o _🦆Duck🦆_.\n
Do que precisa?\n
!duck - Te explico meus códigos caso não saiba como falar comigo.\n
!d - apaga para todos a mensagem selecionada.\n
!ajuda - me faça uma pergunta e tentarei te ajudar.\n
!fale - Eu falo o que me mandar.\n
!fig - Crio figurinha a partir de imagens, gifs ou vídeos enviados (o comando deve ficar na legenda ou marque a mídia desejada).\n
!audio - Crio um áudio a partir de musica (mas vc precisa mandar a música e marcar ela!).\n
!doc - Te envio a mídia em forma de documento.\n
!motiva - Te mando uma frase de motivação.\n
!(pedra, papel, tesoura) - Escolha um e tente me vencer.\n
!yt - Eu pesquiso para você no Youtube.\n
!google - Da um google no chat.\n
!(cara, coroa) - Tome uma decisao a partir de cara ou coroa\n
!spotify - Pesquiso no spotify.\n
!transcreva - Parafraseio seu texto.\n
# - Vc fala comigo, mas lembre-se, precisa dar espaço dps do #!\n
#i quer treinar inglês? converse comigo totalmente em inglês`
}

exports.listMotivacoes = () => {
    return [
        "se ainda venta, não adianta varrer. Espere o momento certo para agir.",
        "É em meio a dificuldade que se encontra a oportunidade.",
        "Mesmo que algo pareça difícil, nunca desista antes de tentar.",
        "Você é o único que entende as suas dificuldades, por isso motive se a prosseguir.",
        "Não é uma vida ruim, é apenas um dia ruim, lembre-se disso.",
        "Já pensou que você já superou muitas dificuldades até aqui?",
        "Cada dificuldade ultrapassada te faz mais forte.",
        "O êxito é a somatória dos pequenos esforços repetidos diariamente.",
        "Mesmo que nem todo dia seja bom, há algo de bom todo dia.",
        "As dores não são eternas, se permita, o seu melhor é o suficiente.",
        "Mesmo que a jornada seja lenta, abrir mão não acelera.",
        "Se nada der certo hoje, acorde mais cedo amanhã e tente novamente.",
        "Você nunca irá fazer nada, se ficar esperando pelas situações perfeitas.",
        "Para chegar em lugares maravilhosos, é necessário passar por caminhos difíceis.",
        "As estrelas mais brilhantes são produzidas nas noites mais escuras.",
        "A diferença entre os dias ruins e bons, é que um ensina e o outro marca.",
        "A superação da dificuldade depende apenas de você.",
        "Domine seus medos.",
        "Por trás de um dia difícil, há uma versão forte de você que sempre seguiu em frente.",
        "Não tome decisões difíceis em dias complicados. Descanse e recupere suas energias!",
        "Não acredite em tudo o que vê. Todo mundo está travando uma batalha interna. Não é fácil para ninguém.",
        "Recomeçar é estar mais forte a cada nova tentativa.",
        "Não são os obstáculos que nos definem, mas sim a maneira como conseguimos ultrapassá-los.",
        "Sua luta não termina quando sentir cansaço, mas sim quando atingir o sucesso tão merecido.",
        "Levante-se sempre! Independente do tamanho da queda, você é vitorioso por estar em pé de novo!",
        "Não compare a velocidade do seu passo com a velocidade dos outros. Viva no seu próprio ritmo!",
        "A mesma rocha que bloqueia o caminho poderá funcionar como um degrau.",
    ]
}

exports.error = () => { "Os erros podem ser por ausência da mídia no servidor ou por mídia não baixada." }

exports.mediaNotFound = () => {
    return [`Não foi possível encontrar a mídia.
Tem certeza que marcou alguma ? Se sim, envie-a novamente!`]
}

exports.jogo1 = () => { return ["tesoura", "pedra", "papel" ]}

exports.caraCoroa = () => { return ["cara", "coroa"]}