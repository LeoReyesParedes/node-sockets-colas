const { io } = require('../server');

const {TicketControl} = require('../classes/ticket-control')

const ticketControl = new TicketControl()

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguienteTicket()
        console.log(siguiente)
        callback(siguiente)
    })

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatroTickets()
    })

    client.on('atenderTicket', (data, callback) => {
        if(!data.escritorio){
            return callback({
                ok: false,
                mensaje: 'El escritorio es necesario.'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio)

        callback(atenderTicket)

        client.broadcast.emit('ultimoscuatro', {
            ultimosCuatro: ticketControl.getUltimosCuatroTickets()
        })
    })
});