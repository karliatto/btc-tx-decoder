function revertTx (txByteRevertedHex) {
	const bytes = txByteRevertedHex.length/2
	const txArr = []
  
	for (let i = 0; i < bytes; i++) {
	  txArr.push(txByteRevertedHex.substr(i * 2, 2))
	}

	return txArr.reverse().join('')
}

module.exports = function(txHex) {
	const buffer = Buffer.from(txHex, 'hex')
	let offset = 0
	
	/**
		Transaction Id:
		From character 10 to 64 and byte reverted.
		In hex each 2 characters are one byte.
	 */
	const version = buffer.slice(offset, offset + 4).toString('hex')

	offset = offset + 4

	const numberOfInputs = buffer.slice(offset, offset + 1).toString('hex')

	offset = offset + 1


	const txid = revertTx(buffer.slice(offset, offset + 32).toString('hex'))

	// Output index we want to redeem from the transaction.
	const outputIndex = buffer.slice(5+32, 5+32+4).toString('hex')

	const lengthScriptSig = parseInt(buffer.slice(5+32+4, 5+32+4+1).toString('hex'), 16)

	const scriptSig = buffer.slice(5+32+4+1, 5+32+4+1+lengthScriptSig).toString('hex')

	return {
		version: version,
		locktime: '',
		vin: [
			{
				txid: txid,
				vout: 0,
				scriptSig: '',
				sequence: ''
			}
		],
		vout: [
			{
				value: '',
				scriptPubKey: ''
			},
			{
				value: '',
				scriptPubKey: '',
			}
		]
	}
}

