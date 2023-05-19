// const test = require('ava')
// const  Instagram = require('../lib')
// const  { media, users, locations, tags } = require( '../helpers')
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const fetch = require('node-fetch');
const text = require('./text.js');
const date = new Date().toLocaleTimeString();
const fs = require('fs');
const tts = require('node-gtts');
const { Configuration, OpenAIApi } = require("openai");
const openai = new OpenAIApi(new Configuration({ apiKey: "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" }));
const https = require('https');
const { description } = require('blackly/src/commands/metada/github.js');
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const client = new Client({ authStrategy: new LocalAuth({ clientId: "Duck", dataPath: "duckccession" }) });

client.initialize();

client.on('qr', qr => qrcode.generate(qr, { small: true }));

client.on('ready', () => console.log('🦆 O Duck acordou! 🦆\npois nao?🍷🗿'));

// client.on('message', async (msg) => {
//     const { from, type, hasMedia, body, hasQuotedMsg } = msg;

//     if (msg?.isStatus) return;

//     if (msg?.broadcast || msg?.from == "status@broadcast") {
//         msg.reply("me tire da transmissao.")
//     }

//     const quotedMsg = hasQuotedMsg ? await msg.getQuotedMessage() : false;

//     const mediaType = async () => {
//         try {
//             if (hasQuotedMsg && quotedMsg.hasMedia) return await quotedMsg.downloadMedia();

//             if (hasMedia) return await msg.downloadMedia();
//             msg.react("💔");
//             return msg.reply(text.mediaNotFound());
//         } catch (err) { console.log(err); }
//     }

//     const contact = await msg.getContact();
//     const { pushname, number, name } = contact;

//     console.log(`😜 ${name} 😜: | ${body} | Mensagem recebida de: 👉 ${pushname} 👈 | 📱 ${number} 📱 | ⌚ ${date} ⌚ | `);

//     if (body) {
//         const response = await fetch(`https://api.simsimi.net/v2/?text=${body.slice(2)}&lc=pt`);
//         const json = await response.json();
//         msg.react("❤");
//         msg.reply(json.success)
//     }
// });


client.on('message_create', async (msg) => {
    if (msg?.broadcast || msg?.from == "status@broadcast" ) return;
    const contact = await msg.getContact();

    try {

            const { from, type, hasMedia, body, hasQuotedMsg } = msg; // destructuring

                const react = {
                    wait: () => msg.react("🖐"),
                    url: () => msg.react("🔗"),
                    success: () => msg.react("✅"),
                    like: () => msg.react("👍"),
                    resend: () => msg.react("🔃"),
                    love: () => msg.react("❤"),
                    duck: () => msg.react("🦆"),
                    error: (err = "Em alguma coisa") => {
                        msg.react("❌")
                        printTela(client, from)
                            .then((image) => sendLogs(image, asCaption(`Deu erro: ${JSON.stringify(err, null, 4)}\n\n${linkNumber()}`)))
                            .catch(() => client.sendMessage('5521973067555@c.us',
                                `Deu erro: ${JSON.stringify(err, null, 4)}\n
                                Não consegui o Print 😥\n\n${linkNumber()}`))
                    },
                    notFoundImage: async () => asReact("📷", await reply("Preciso de uma imagem para fazer isso.")),
                }
        




            const quotedMsg = hasQuotedMsg ? await msg.getQuotedMessage() : false;
            // Sempre que for usar essa função, coloquei await antes de chamar ela. Ex: await mediaType()
            // Armazene em uma variável, para ficar mais legível: Ex: const media = await mediaType()
            const mediaType = async () => {

                if (hasQuotedMsg && quotedMsg.hasMedia) return await quotedMsg.downloadMedia(); // Verifica se a mensagem marcada/respondida é mídia

                if (hasMedia) return await msg.downloadMedia(); // Verifica se a mensagem recebida é uma mídia
                msg.react("💔"); // Reage com um coração partido
                msg.reply(text.mediaNotFound()); // Responde com a mensagem de mídia não encontrada
                // Caso ocorra algum erro, ele será exibido no console
            }

            const contact = await msg.getContact();
            const { pushname, number, name } = contact;

        console.log(`😜 ${name} 😜: | ${body} | Mensagem recebida de: 👉 ${pushname} 👈 | 📱 ${number} 📱 | ⬆ para: ${msg.to} ⬆ | às:⌚ ${date} ⌚ | ${msg.deviceType} `);


        // if(body.match(/^arquive/i)){
            
        // }

        if (body.match(/!ttk/)) {
            msg.react.wait
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'e3e9dfb27dmsh7e6590f85191a04p111641jsn2ce1182e7876',
                    'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com'
                }
            };            

                            fetch(`https://tiktok-video-no-watermark2.p.rapidapi.com/?url=${body.slice(4).trim()}&hd=0`, options)
                            .then(response => response.json())
                            .then(async response => {
                                console.log(response.data)
                                let linkVideo = response.data.play
                                const media = await MessageMedia.fromUrl(linkVideo, {
                                    unsafeMime: true,
                                    reqOptions: {
                                        agent: httpsAgent
                                    }
                                })
                                msg.reply(media);
                            })
                            .then(() => msg.react("❤"))
                            .catch(err => console.error(err));
        }

        if(body.match(/^!image/i)) {
            const url = 'https://openai80.p.rapidapi.com/images/generations';
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': 'e3e9dfb27dmsh7e6590f85191a04p111641jsn2ce1182e7876',
                    'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
                },
                body: {
                    prompt: body.slice(6),
                    n: 2,
                    size: '1024x1024'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.text();
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }

        if(body.match(/^!anime/i)) {
            msg.react(wait)
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'e3e9dfb27dmsh7e6590f85191a04p111641jsn2ce1182e7876',
                    'X-RapidAPI-Host': 'any-anime.p.rapidapi.com'
                }
            };
            
            fetch('https://any-anime.p.rapidapi.com/anime', options)
                .then(response => response.json())
                .then(response => msg.reply(response))
                .catch(err => console.error(err));
        }

        if (body.match(/^!ajuda/i)) {
                msg.react("🧠")
                const chatGpt = async (q) => {
                    const response = await openai.createCompletion({
                        model: "text-davinci-003",
                        prompt: `Q: ${q}`,
                        temperature: 1,
                        max_tokens: 1000,
                        top_p: 0,
                        frequency_penalty: 0,
                        presence_penalty: 0,
                    });
                    return response.data.choices[0].text.trim()
                }

                const resposta = await chatGpt(body.slice(6).trim())
                console.log(resposta)
        }

        if (body.match(/^!chama/i)) {
            const numero = body.replace(/\!chama\s[+]?(\d{13})\s(.*)/gm, "$1")
            const mesn = body.replace(/\!chama\s[+]?(\d{13})\s(.*)/gm, "$2")
            const number_details = await client.getNumberId(numero); // get mobile number details

                if (number_details) {
                    const sendMessageData = await client.sendMessage(number_details._serialized, mesn); // send message
                } else {
                    console.log(numero, mesn);
                }
        }

        if (body.match(/^!delete/i)) {
            await quotedMsg.delete(true);
        }

        // if (body.match(/^@/i)) {
        //     const username = body.match(/^@\S{6,}/i)[0].slice(1); // Verifica se a mensagem tem 6+ caracteres após o @
        //         if (!username) return msg.reply("Perfil do Instagram inválido.")
        //             msg.react("🖐")
        //             msg.reply(`https://www.instagram.com/${username}`)
        //             msg.react("❤")
        // }

        if (body.match(/^!rewrite/i)) {
                msg.react("🖐")
            const slasla = {
                "language": "pt",
                "strength": 3,
                "text": body.slice(8)
            }
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': '5640ebca3cmshc00db75dd824a83p16fe4cjsn13dd1fbac4ce',
                    'X-RapidAPI-Host': 'rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com'
                },
                body: JSON.stringify(slasla)
            }


                    fetch('https://rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com/rewrite', options)
                        .then(response => response.json())
                        .then(response => msg.reply(response.rewrite))
                        .catch(err => console.error(err));
                    msg.react("❤")
        }

        if (body.match(/^!transcreva/i)) {
            const encodedParams = new URLSearchParams();
                  encodedParams.append("text", body.slice(12));
                  encodedParams.append("lang", "pt");
                  encodedParams.append("paraphrase_capital", "true");

            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': 'e3e9dfb27dmsh7e6590f85191a04p111641jsn2ce1182e7876',
                    'X-RapidAPI-Host': 'rimedia-paraphraser.p.rapidapi.com'
                },
                body: encodedParams
            };

                    fetch('https://rimedia-paraphraser.p.rapidapi.com/api_paraphrase.php', options)
                        .then(response => response.json())
                        .then(response => msg.reply(response.result_text_new))
                        .catch(err => console.error(err));
        }

        if (body.match(/^!yt/i)) { // Detecta se a mensagem começa com @
            const buscayt = body.match(/!pesquisar(.*)/i)[0].slice(11).replaceAll(/(\s)+/g, "+")
                msg.react("❤")
                msg.reply(`https://www.youtube.com/results?search_query=${buscayt}`)
                msg.react("❤")
        }

        if (body.match(/^!google/i)) {
                react.wait()
            const daumg = body.match(/!google(.*)/i)[0].slice(8).replaceAll(/(\s)+/g, "+")
                msg.reply(`www.google.com/search?client=opera-gx&q=${daumg}`)
                react.love()
        }

        if (body.match(/^!spotify/i)) {
            const daumg = body.match(/!spotify(.*)/i)[0].slice(9).replaceAll(/(\s)+/g, "+")
                msg.react("❤")
                msg.reply(`https://open.spotify.com/search/${daumg}`)
                msg.react("❤");
        }

        if (body.match(/^!resume/i)) {
            const daumg = body.match(/!resume(.*)/)[0].slice(8)
                msg.react("🖐")
            const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '5640ebca3cmshc00db75dd824a83p16fe4cjsn13dd1fbac4ce',
                        'X-RapidAPI-Host': 'summarize-me.p.rapidapi.com'
                    }
                };
                        fetch(`https://summarize-me.p.rapidapi.com/summarize?text=${daumg}&complexity=2`, options)
                            .then(response => response.json())
                            .then(response => msg.reply(response.summary))
                            .catch(err => console.error(err),
                            msg.react("😓"),
                            msg.reply("parece que algo inesperado aconteceu. pode ser excesso de linha ou erro meu"));
                            msg.react("❤");
        }

        if (body.match(/^!retro/)) {
            const encodedParams = new URLSearchParams();
                  encodedParams.append("seed", body.slice(7));

            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': 'e3e9dfb27dmsh7e6590f85191a04p111641jsn2ce1182e7876',
                    'X-RapidAPI-Host': 'retro-avatar-generator.p.rapidapi.com'
                },
                body: encodedParams
            };

                    fetch('https://retro-avatar-generator.p.rapidapi.com/generate-avatar/', options)
                        .then(response => response.json())
                        .then(response => {
                            let linkVideo = response.avatar_url
                            const media = MessageMedia.fromUrl(linkVideo, {
                                unsafeMime: true
                            })
                            const buffer = media.data
                            const fileName = new Date().getTime()
                            const path = `./temp/${fileName}.jpg`
                            fs.writeFileSync(path, buffer)
                                msg.reply(MessageMedia.fromFilePath(path))
                        })
                        .catch(err => console.error(err));
        }

        if (body.match(/^!fume/i)) {
                     msg.react.duck()
                     msg.reply("🚬🔥")
            await msg.reply("🌬💨")
            await msg.reply("DUCK BOLADÃO!!🤬")
        }

            const command = body
                .toLowerCase()
                .split(" ")
            [0];
            const listjg = text.jogo1();
            const jogote = listjg[Math.floor(Math.random() * listjg.length)];
            const listjg2 = text.caraCoroa();
            const jogo2 = listjg2[Math.floor(Math.random() * listjg2.length)];
            const motiva = text.listMotivacoes()
            const motivacaoRandom = motiva[Math.floor(Math.random() * motiva.length)];

        switch (command) {


            case "#i":
                const encodedParams = new URLSearchParams();
                      encodedParams.append("in", body.slice(3));
                      encodedParams.append("op", "in");
                      encodedParams.append("cbot", "1");
                      encodedParams.append("SessionID", number);
                      encodedParams.append("cbid", "1");
                      encodedParams.append("key", "RHMN5hnQ4wTYZBGCF3dfxzypt68rVP");
                      encodedParams.append("ChatSource", "RapidAPI");
                      encodedParams.append("duration", "1");

                const options = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'X-RapidAPI-Key': 'e3e9dfb27dmsh7e6590f85191a04p111641jsn2ce1182e7876',
                        'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com'
                    },
                        body: encodedParams
                };

                        fetch('https://robomatic-ai.p.rapidapi.com/api', options)
                            .then(response => response.json())
                            .then(response => msg.reply(response.out))
                            .catch(err => console.error(err));
                break

            case "#a":
                const out = await response.out();
                    encodedParams.append("in", body.slice(3));
                    encodedParams.append("op", "in");
                    encodedParams.append("cbot", "1");
                    encodedParams.append("SessionID", number);
                    encodedParams.append("cbid", "1");
                    encodedParams.append("key", "RHMN5hnQ4wTYZBGCF3dfxzypt68rVP");
                    encodedParams.append("ChatSource", "RapidAPI");
                    encodedParams.append("duration", "1");

                        fetch('https://robomatic-ai.p.rapidapi.com/api', options)
                            .then(response => response.json())
                            .then(response => msg.reply(tts("en-us")
                                .save(`./temp/audioTTS_${dateNow}.mp3`, response.out, () => {
                                    const audioPtt = MessageMedia.fromFilePath(`./temp/audioTTS_${dateNow}.mp3`)
                                        msg.reply(audioPtt, undefined, { sendAudioAsVoice: true })
                                    fs.unlink(`./temp/audioTTS_${dateNow}.mp3`, () => { })
                                }))
                                .catch(err => console.error(err)));
                            msg.react("❤")
                break

            case "!audio":
                if (type.match(/ptt|audio/) || quotedMsg.type.match(/ptt|audio/)) {
                    const media = await mediaType();
                          msg.react("🖐")
                    await msg.reply(media, undefined, { sendAudioAsVoice: true })
                          msg.react("❤")
                } else return msg.reply("Marque um áudio.")
                break

            case "!fig":
                if (type.match(/video|gif|image/) || quotedMsg.type.match(/video|gif|image/)) {
                    const media = await mediaType();
                          msg.react("🖐")
                    await msg.reply(media, undefined, { sendMediaAsSticker: true, stickerAuthor: pushname, stickerName: "🦆Duck🦆" })
                          msg.react("❤")
                }
                break

            case "!doc":
                if (type.match(/ptt|audio|document|video|image/) || quotedMsg.type.match(/ptt|audio|document|video|image/)) {
                    const media = await mediaType();
                          msg.react("🖐");
                    await msg.reply(media, undefined, { sendMediaAsDocument: true });
                          msg.react("");
                          msg.react("❤");
                } else return msg.reply("mande ou marque uma mídia")
                break

            case "!duck":
                    msg.react("🦆")
                    msg.reply(text.menuDuck())
                break

            case "!erros":
                    msg.react("👀")
                    msg.reply(text.error())
                    msg.react("🦆")
                break

            case "!motiva":
                    msg.react("💝")
                    msg.reply(motivacaoRandom)
                break

            case "!cara":
                    msg.react("❤")
                    msg.reply(jogo2)
                break

            case "!coroa":
                    msg.react("❤")
                    msg.reply(jogo2)
                break

            // case "oi":
            //         msg.react("😄");
            //         msg.reply(`olá, ${pushname}! 😁`);
            // //     break

            case "tchau":
                    msg.react("😢");
                    msg.reply('tchau! :(');
                break

            case "flw":
                    msg.react("😢");
                    msg.reply('tchau! :(');
                break

            case "#":
                const response = await fetch(`https://api.simsimi.net/v2/?text=${body.slice(2)}&lc=pt`);
                const json = await response.json();
                        msg.react("❤")
                    if (json.success.match(/Eu não resposta. Por favor me ensine./i)) return msg.reply(
                        tts("pt")
                            .save(`./temp/audioTTS_${dateNow}.mp3`, "foda-se! eu não sei responder isso", () => {
                                const audioPtt = MessageMedia.fromFilePath(`./temp/audioTTS_${dateNow}.mp3`)
                                    msg.reply(audioPtt, undefined, { sendAudioAsVoice: true })
                                fs.unlink(`./temp/audioTTS_${dateNow}.mp3`, () => { })
                            }))
                             // if 1

                                    if (json.success.match(/taeyeon é do joow/i)) return msg.reply(
                                        tts("pt")
                                            .save(`./temp/audioTTS_${dateNow}.mp3`, "concordo!", () => {
                                                const audioPtt = MessageMedia.fromFilePath(`./temp/audioTTS_${dateNow}.mp3`)
                                                    msg.reply(audioPtt, undefined, { sendAudioAsVoice: true })
                                                fs.unlink(`./temp/audioTTS_${dateNow}.mp3`, () => { })
                                            }))
                                            // if 2
                                        
                                                    if (json.success.match(/hmakqnw/i)) return msg.reply(
                                                        tts("pt")
                                                            .save(`./temp/audioTTS_${dateNow}.mp3`, "com toda certeza!", () => {
                                                                const audioPtt = MessageMedia.fromFilePath(`./temp/audioTTS_${dateNow}.mp3`)
                                                                    msg.reply(audioPtt, undefined, { sendAudioAsVoice: true })
                                                                fs.unlink(`./temp/audioTTS_${dateNow}.mp3`, () => { })
                                                            }))
                                                            // if 3
                            
                const dateNow = new Date().getTime();
                tts("pt")
                    .save(`./temp/audioTTS_${dateNow}.mp3`, json.success, () => {
                        const audioPtt = MessageMedia.fromFilePath(`./temp/audioTTS_${dateNow}.mp3`)
                            msg.reply(audioPtt, undefined, { sendAudioAsVoice: true })
                        fs.unlink(`./temp/audioTTS_${dateNow}.mp3`, () => { })
                    })
                     // if 4
                    // msg.reply(json.success);
                break

            case "!tesoura":
                    msg.reply(jogote);
                    msg.react("✂")
                break

            case "!pedra":
                    msg.reply(jogote);
                    msg.react("🪨")
                break

            case "!papel":
                    msg.reply(jogote);
                    msg.react("📃")
                break
        }

    } catch (error) {
    }
});
process.on("unhandledRejection", (reason) => {
    console.log(reason)
});