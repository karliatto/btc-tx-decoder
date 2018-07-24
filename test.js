const expect = require('chai').expect;
const decoder = require('./decoder');

describe('bitcoin transactions decoder', () => {

	const txHex = '0100000001186f9f998a5aa6f048e51dd8419a14d8a0f1a8a2836dd734d2804fe65fa35779000000008b483045022100884d142d86652a3f47ba4746ec719bbfbd040a570b1deccbb6498c75c4ae24cb02204b9f039ff08df09cbe9f6addac960298cad530a863ea8f53982c09db8f6e381301410484ecc0d46f1918b30928fa0e4ed99f16a0fb4fde0735e7ade8416ab9fe423cc5412336376789d172787ec3457eee41c04f4938de5cc17b4a10fa336a8d752adfffffffff0260e31600000000001976a914ab68025513c3dbd2f7b92a94e0581f5d50f654e788acd0ef8000000000001976a9147f9b1a7fb68d60c536c2fd8aeaa53a8f3cc025a888ac00000000';
	const txDecoded = decoder(txHex);

	it('should return an object', () => {
		expect(txDecoded).to.be.an('object');
	});

	it('should decode right version', () => {
		expect(txDecoded).to.have.property('version', '01000000');
	});

	it('should decode right transaction id', () => {
		expect(txDecoded).to.have.property('vin');
		expect(txDecoded.vin).to.be.an('array');
		expect(txDecoded.vin[0]).to.have.property('txid', '7957a35fe64f80d234d76d83a2a8f1a0d8149a41d81de548f0a65a8a999f6f18');
	})
})
