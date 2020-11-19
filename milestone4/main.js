dayjs.extend(window.dayjs_plugin_customParseFormat);

var app = new Vue({
    el: '#root',
    data: {
        active_contact: 0,
        new_message: '',
        search_text: '',
        user: {
            name: 'Sofia',
            avatar: '_io'
        },
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ]
    },
    methods: {
        change_active_contact(contact_index) {
            this.active_contact = contact_index;
            this.autoscroll();
        },
        send_message() {
            // controllo che il testo non sia vuoto prima di inviare il messaggio
            if(this.new_message.trim().length != 0) {
                // recupero il testo digitato e creo un nuovo messaggio, cioè un oggetto
                let new_message_object = {
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    message: this.new_message,
                    status: 'sent'
                };
                // recupero l'array dei messaggi della conversazione corrente
                let current_chat = this.contacts[this.active_contact].messages;
                // inserisco l'oggetto nell'array dei messaggi della conversazione corrente
                current_chat.push(new_message_object);
                // resetto l'input
                this.new_message = '';

                this.autoscroll();

                // risposta del pc
                setTimeout(function() {
                    // creo un nuovo oggetto con il messaggio del pc
                    let pc_messsage = {
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        message: 'ok',
                        status: 'received'
                    };
                    // inserisco l'oggetto della risposta nell'array dei messaggi della conversazione corrente
                    current_chat.push(pc_messsage);

                    app.autoscroll();

                }, 1000);
            }

        },
        autoscroll() {
            // faccio scroll della finestra dei messaggi
            Vue.nextTick(function() {
                let chat_container = document.getElementsByClassName('right-messages')[0];
                chat_container.scrollTop = chat_container.scrollHeight;
            });
        },
        search() {
            this.contacts.forEach((contact) => {
                let contact_name = contact.name.toLowerCase();
                let searched_name = this.search_text.toLowerCase();
                if(contact_name.includes(searched_name)) {
                    contact.visible = true;
                } else {
                    contact.visible = false;
                }
            });
        },
        get_time(date_string) {
            // formato data: '10/01/2020 15:51:00'
            return dayjs(date_string, "DD/MM/YYYY HH:mm:ss").format('HH:mm');
        }
    },
    mounted: function() {
        this.autoscroll();
    },
});
