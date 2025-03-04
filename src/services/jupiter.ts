import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js';
import fetch from 'cross-fetch';
import { Wallet } from '@project-serum/anchor';
import bs58 from 'bs58';




// It is recommended that you use your own RPC endpoint.
// This RPC endpoint is only for demonstration purposes so that this example will run.

//const connection = new Connection('https://newest-withered-choice.solana-devnet.quiknode.pro/afacb080ac231024661e0303395cafa6418cc39f');
 const connection = new Connection('https://solana-devnet.g.alchemy.com/v2/qTkt3FbkdPvSS0LU6xN-us0rkgy0yzbn');
//const connection = new Connection('https://newest-withered-choice.stacks-testnet.quiknode.pro/afacb080ac231024661e0303395cafa6418cc39f')

const wallet = new Wallet(Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY || '' || "2SvCQeb28CnFWBTZrm5s3nq3pgzmH5Mpxa2CBDTDoJgAiLVJFpnC43WQQRn7DVEy4QS1t4BSPmEYs1jR34sZ21Zb")))

const walletAdress="8CPbBrFF4GqAmK7CxonbiJ29NtqWgtcZk32hVxcijiyf"

//Swapping SOL to USDC with input 0.1 SOL and 0.5% slippage
const quoteResponse = await (
  await fetch(
    'https://api.jup.ag/swap/v1/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=50000000&slippageBps=50&restrictIntermediateTokens=true'
  )
).json();

console.log({ quoteResponse })

// get serialized transactions for the swap
const { swapTransaction } = await (
  await fetch('https://api.jup.ag/swap/v1/swap', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // quoteResponse from /quote api
      quoteResponse,
      // user public key to be used for the swap
      // userPublicKey: wallet.publicKey.toString(),
      userPublicKey: wallet.publicKey.toString(),
      destinationWallet: walletAdress,

      wrapAndUnwrapSol: true,
      // Optional, use if you want to charge a fee.  feeBps must have been passed in /quote API.
      // feeAccount: "fee_account_public_key"
      asLegacyTransaction: true  // This is important for devnet compatibility
    })
  })
).json();

// deserialize the transaction
const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
var transaction = VersionedTransaction.deserialize(swapTransactionBuf);
console.log("transactions => "+transaction);

// sign the transaction
transaction.sign([wallet.payer]);


// get the latest block hash
const latestBlockHash = await connection.getLatestBlockhash({commitment: 'processed'});

// Execute the transaction
const rawTransaction = transaction.serialize()
const txid = await connection.sendRawTransaction(rawTransaction, {
  skipPreflight: true,
  maxRetries: 3,
  preflightCommitment:"processed"
});

// Add a more flexible confirmation strategy with timeout
console.log(`Transaction sent: ${txid}`);
console.log(`Awaiting confirmation...`);

 // Confirm transaction with timeout
 const confirmationStrategy = {
  blockhash: latestBlockHash.blockhash,
  lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
  signature: txid
};

try {
  const confirmation = await connection.confirmTransaction({
    signature: txid,
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
  }, 'confirmed');
  
  if (confirmation.value.err) {
    console.error(`Transaction failed: ${confirmation.value.err}`);
  } else {
    console.log(`Transaction confirmed!`);
    console.log(`https://solscan.io/tx/${txid}?cluster=devnet`);
  }
} catch (err) {
  console.error(`Confirmation error:`, err);
  console.log(`You can still check the transaction status at: https://solscan.io/tx/${txid}?cluster=devnet`);
}
