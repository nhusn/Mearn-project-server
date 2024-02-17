const history = require('../Models/billingModel')

exports.addToHistoryController = async (req,res) => {
    const {email,invoiceDate,billedAddress,mobNo,techName,jobDate,invoiceType,repairType,km,registerNo,chasisNo,engineNo,modelName} = req.body

    // ,labourPartsCode,descLabourParts,billingType,qty,uom,rate,discount
    const {allHistory,customerDetails} = req.body
    console.log(allHistory);

    try {
        const newHistory = new history({
            email,servhistory:[
                {
                    customerDetails:{
                        invoiceDate,billedAddress,mobNo,techName,jobDate,invoiceType,repairType,km,registerNo,chasisNo,engineNo,modelName
                    },
                    partsDetails:[
                        allHistory.forEach(item=>(
                            {
                                labourPartsCode:"123",descLabourParts:"horn",billingType:"ww",qty:1,uom:"Each",rate:122,discount:0
                            }
                        ))
                        
                            
                        
                        
                    ]
                }
            ]
        })
        await newHistory.save()
        return res.status(200).json(newHistory)
    } catch (error) {
        return res.status(401).json(error)
    }
}