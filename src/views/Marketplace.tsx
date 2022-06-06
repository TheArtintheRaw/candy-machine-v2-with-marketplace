import { useRef } from 'react'
import { CandyShop } from '@liqnft/candy-shop-sdk'
import { CandyShopDataValidator, Orders, Stat, OrderDetail } from '@liqnft/candy-shop'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Cluster } from '@solana/web3.js'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import styled from 'styled-components'

const CANDY_SHOP_CREATOR_ADDRESS = new PublicKey(process.env.REACT_APP_CANDY_SHOP_CREATOR_ADDRESS!)
const CANDY_SHOP_TREASURY_MINT = new PublicKey(process.env.REACT_APP_CANDY_SHOP_TREASURY_MINT!)
const CANDY_SHOP_PROGRAM_ID = new PublicKey(process.env.REACT_APP_CANDY_SHOP_PROGRAM_ID!)
const NETWORK = process.env.REACT_APP_SOLANA_NETWORK! as Cluster

const DesContainer = styled.div`
  width: 100%;
`

const Marketplace: React.FC = () => {
  const wallet = useAnchorWallet();

  const candyShopRef = useRef<CandyShop>(
    new CandyShop(
      CANDY_SHOP_CREATOR_ADDRESS,
      CANDY_SHOP_TREASURY_MINT,
      CANDY_SHOP_PROGRAM_ID,
      NETWORK
    )
  )

  return (
    <DesContainer>
      <Stat
        candyShop={candyShopRef.current}
        title={'Ghostlife Club Marketplace'}
        description={'Ghostlife Club Marketplace, Its the Second Sales Marketplace for all our Holders'}
        style={{ paddingBottom: 50 }}
      />
      <CandyShopDataValidator>
      <Orders
        wallet={wallet}
        candyShop={candyShopRef.current}
        walletConnectComponent={<WalletMultiButton />}
      />
      </CandyShopDataValidator>
      <OrderDetail
        tokenMint={'WfL9fAggBMHmjvBEu1v53fQkRmB3Cn4giJSSQxVSC5W'} // token mint of the NFT
        backUrl={'/'} // will redirect to this route after sale is completed
        candyShop={candyShopRef.current}
        walletConnectComponent={<WalletMultiButton />}
        wallet={wallet}
      />
    </DesContainer>
  )
}

export default Marketplace