const { getTickets, getTicketDetails, postMessage, patchTicket, getAdmins } = require("../services/adminSupport.services")
const { simulateUserTicket, simulateUserReply } = require("../services/adminSupportSimulation.services")

async function listTickets(req, res, next) {
  try {
    const {
      page,
      limit,
      search,
      sortKey,
      sortDirection,
      ...filters
    } = req.query

    const result = await getTickets({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      search,
      sortKey,
      sortDirection,
      filters,
    })

    // console.log(JSON.stringify(result, null, 2))

    res.json(result)
  } catch (error) {
    next(error)
  }
}


async function ticketDetails(req, res, next) {
  try {
    const { id } = req.params

    const result = await getTicketDetails(id)

    // console.log("ticket detail :", result)

    res.json(result)
  } catch (error) {
    next(error)
  }
}



async function sendMessage(req, res, next) {
  try {
    const { id } = req.params
    const { content, isInternal } = req.body

    console.log("ticket id :", id)

    const ticket = await postMessage({
      ticketId: id,
      sender: {
        type: "admin",
        id: req.user._id,
      },
      content,
      isInternal,
    })

    res.json(ticket)
  } catch (error) {
    next(error)
  }
}


async function updateTicket(req, res, next) {
  try {
    const { id } = req.params

    const updates = req.body

    const ticket = await patchTicket({
      ticketId: id,
      updates,
      adminId: req.user._id,
    })

    res.json(ticket)
  } catch (error) {
    next(error)
  }
}

async function admins(req, res, next) {

  try {
    const admins = await getAdmins()

    // console.log("admins :", admins)

    res.json(admins)
  } catch (error) {
    next(error)
  }
}






async function simulateTicketController(req, res, next) {
  console.log("controller simulate")
  try {
    const { userId, content, category } = req.body

    

    const ticket = await simulateUserTicket({
      userId,
      content: content || "Message de test",
      category: category || "question",
    })

    console.log("the ticket :", ticket)

    res.json(ticket)
  } catch (error) {
    next(error)
  }
}



async function simulateUserReplyController(req, res, next) {
  try {
    const { id } = req.params
    const { userId, content } = req.body

    const result = await simulateUserReply({
      ticketId: id,
      userId,
      content: content || "Réponse simulée utilisateur",
    })

    res.json(result)
  } catch (error) {
    next(error)
  }
}






module.exports = {
  listTickets,
  ticketDetails,
  sendMessage,
  updateTicket,
  admins,
  simulateTicketController,
  simulateUserReplyController,
}
