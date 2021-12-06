const { assert } = require('chai')

const DekarbonToken = artifacts.require('./DekarbonToken')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('DekarbonToken', (accounts) => {
  let dekarbonToken

  beforeEach( async () => {
    dekarbonToken = await DekarbonToken.deployed()
  })

  describe('deployment', async () => {
      it('deploys successfully', async () => {
        const address = dekarbonToken.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
      })

      it('has a name', async () => {
        const name = await dekarbonToken.name()
        assert.equal(name, 'DekarbonToken')
      })

      it('has a symbol', async () => {
        const symbol = await dekarbonToken.symbol()
        assert.equal(symbol, 'DKTK')
      })
  })

  describe('minting', async () => {
    it('creates a new token', async () => {
      const result = await dekarbonToken.mint('#EC058E')

      const event = result.logs[0].args
      const tokenId = event.tokenId.toNumber()
      const totalSupply = await dekarbonToken.totalSupply()
      const item = await dekarbonToken.Items(tokenId)
      const owner = await dekarbonToken.ownerOf(tokenId)
      const approvedAddress = await dekarbonToken.getApproved(tokenId)
      console.log(approvedAddress)

      //success
      assert.equal(tokenId, totalSupply, 'id is correct')
      assert.equal(item.uri, '#EC058E', 'color is correct')
      assert.equal(item.creator, owner, 'creator is correct')
      // assert.equal(approvedAddress, market.address, 'approved address is correct')
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
      assert.equal(event.to, accounts[0], 'to is correct')
    })
  })

  describe('indexing', async () => {
    it('lists colors', async () => {
      //mint 3 more tokens
      await dekarbonToken.mint('#5386E4')
      await dekarbonToken.mint('#FFFFFF')
      await dekarbonToken.mint('#000000')

      const totalSupply = await dekarbonToken.totalSupply()
      let item
      let result = []

      for (var i=1; i <= totalSupply; i++){
        item = await dekarbonToken.Items(i)
        result.push(item.uri)
      }

      let expected = ['#EC058E', '#5386E4', '#FFFFFF', '#000000']
      assert.equal(result.join(','), expected.join(','))
    })
  })
})