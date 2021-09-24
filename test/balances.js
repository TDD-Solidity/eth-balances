const Balances = artifacts.require('Balances')

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract('Balances', function (accounts) {
  const [owner, user1, user2, user3] = accounts

  const STARTING_BALANCE = '100'
  const PAYMENT_AMOUNT = '1'

  console.log(accounts)
  console.log(accounts.length)
  console.log(accounts[0])
  console.log(typeof accounts[0])

  it('should assert true', async function () {
    await Balances.deployed()
    return assert.isTrue(true)
  })

  it('should start with 1 eth', async () => {
    const balanceUser1 = await web3.eth.getBalance(user1)
    const balanceUser2 = await web3.eth.getBalance(user2)

    console.log(balanceUser1)
    console.log(balanceUser2)

    expect(balanceUser1).to.equal(web3.utils.toWei(STARTING_BALANCE, 'ether'))
    expect(balanceUser2).to.equal(web3.utils.toWei(STARTING_BALANCE, 'ether'))

    const transactionReceipt = await web3.eth.sendTransaction({
      from: user1,
      to: user2,
      value: web3.utils.toWei(PAYMENT_AMOUNT, 'ether'),
    })

    console.log('receipt: ', transactionReceipt)

    const newBalanceUser1 = await web3.eth.getBalance(user1)
    const newBalanceUser2 = await web3.eth.getBalance(user2)

    console.log('newBalanceUser2: ', newBalanceUser2)

    const expectedUser1NewBalance = web3.utils.toWei(
      (+STARTING_BALANCE - +PAYMENT_AMOUNT).toString(),
      'ether',
    )

    const expectedUser2NewBalance = web3.utils.toWei(
      (+STARTING_BALANCE + +PAYMENT_AMOUNT).toString(),
      'ether',
    )

    console.log(expectedUser2NewBalance)

    const gasUsedWei = web3.utils.toWei(
      transactionReceipt.gasUsed.toString(),
      'gwei',
    )

    console.log({ gasUsedWei })

    let num = web3.utils.toBN(web3.utils.toWei(STARTING_BALANCE, 'ether'))
    
    num = num.add(web3.utils.toBN(web3.utils.toWei(PAYMENT_AMOUNT, 'ether')));

    // .add(web3.utils.toWei(PAYMENT_AMOUNT, 'ether'));

    console.log(num)

    expect(num.toString()).to.equal(expectedUser2NewBalance)

    // expect(newBalanceUser1).to.equal(expectedUser1NewBalance)
  })
})
