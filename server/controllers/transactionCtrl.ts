import { Response } from 'express'
import { IReqUser, ITransaction } from './../utils/Interface'
import db from './../config/db'

const transactionCtrl = {
  insertTransaction: async(req: IReqUser, res: Response) => {
    try {
      const { amount, purpose, type } = req.body
      if (!amount || !purpose || !type)
        return res.status(400).json({ msg: 'Please provide amount, purpose, and type of transaction.' })

      if (amount < 1000)
        return res.status(400).json({ msg: 'Amount can\'t be less than Rp.1.000,00' })

      if (purpose > 255)
        return res.status(400).json({ msg: 'Purpose can\'t be more than 255 characters.' })

      if (type !== 'income' && type !== 'expense')
        return res.status(400).json({ msg: 'Transaction type should be either income or expense.' })

      const transactionId = await db<ITransaction>('transaction').returning('id').insert({ amount, purpose, type, user: req.user!.id })

      // @ts-ignore
      const transactionData = await db<ITransaction>('transaction').where('id', transactionId[0].id)

      return res.status(200).json({
        msg: 'Transaction has been added successfully.',
        transaction: transactionData[0]
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getTransactions: async(req: IReqUser, res: Response) => {
    try {
      const transactions = await db<ITransaction>('transaction').where('user', req.user!.id).andWhereRaw("date_part('year', created_at) = date_part('year', CURRENT_DATE)").orderBy('created_at', 'desc')

      const dateData: string[] = []
      const formattedData = []
      for (let transaction of transactions) {
        if (!dateData.includes(new Date(transaction.created_at).toLocaleDateString())) {
          dateData.push(new Date(transaction.created_at).toLocaleDateString())
          formattedData.push({ date: new Date(transaction.created_at).toLocaleDateString(), data: [] })
        }
      }
      
      for (let item of formattedData) {
        for (let transaction of transactions) {
          if (new Date(transaction.created_at).toLocaleDateString() === item.date) {
            // @ts-ignore
            item.data.push(transaction)
          }
        }
      }

      return res.status(200).json({ transactions: formattedData })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getTransactionsByMonth: async(req: IReqUser, res: Response) => {
    try {
      const incomes = await db<ITransaction>('transaction')
                        .select(db.raw("date_part('month', created_at) as month"))
                        .sum('amount')
                        .where('user', req.user!.id)
                        .groupByRaw("date_part('month', created_at), type, date_part('year', created_at)")
                        .having('type', '=', 'income')
                        .havingRaw("date_part('year', created_at) = ?", [`${req.query.year}`])

      const expenses = await db<ITransaction>('transaction')
                        .select(db.raw("date_part('month', created_at) as month"))
                        .sum('amount')
                        .where('user', req.user!.id)
                        .groupByRaw("date_part('month', created_at), type, date_part('year', created_at)")
                        .having('type', '=', 'expense')
                        .havingRaw("date_part('year', created_at) = ?", [`${req.query.year}`])

      return res.status(200).json({
        year: req.query.year,
        incomes,
        expenses
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getLatestTransaction: async(req: IReqUser, res: Response) => {
    try {
      const transactions = await db<ITransaction>('transaction').where('user', req.user!.id).andWhereRaw("date_part('year', created_at) = date_part('year', CURRENT_DATE)").orderBy('created_at', 'desc').limit(4)

      const dateData: string[] = []
      const formattedData = []
      for (let transaction of transactions) {
        if (!dateData.includes(new Date(transaction.created_at).toLocaleDateString())) {
          dateData.push(new Date(transaction.created_at).toLocaleDateString())
          formattedData.push({ date: new Date(transaction.created_at).toLocaleDateString(), data: [] })
        }
      }
      
      for (let item of formattedData) {
        for (let transaction of transactions) {
          if (new Date(transaction.created_at).toLocaleDateString() === item.date) {
            // @ts-ignore
            item.data.push(transaction)
          }
        }
      }

      return res.status(200).json({ transactions: formattedData })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getCurrentBalance: async(req: IReqUser, res: Response) => {
    try {
      const incomes = await db<ITransaction>('transaction').sum('amount').where('user', req.user!.id).andWhere('type', 'income')
      const expenses = await db<ITransaction>('transaction').sum('amount').where('user', req.user!.id).andWhere('type', 'expense')

      const balance = Number(incomes[0].sum) - Number(expenses[0].sum)

      return res.status(200).json({ balance })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getTransactionYear: async(req: IReqUser, res: Response) => {
    try {
      const years = await db<ITransaction>('transaction').distinct(db.raw("date_part('year', created_at) as year")).where('user', req.user!.id)
      res.status(200).json({ years })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default transactionCtrl