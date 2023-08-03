import type { NextPage } from "next"
import styles from "../styles/Home.module.css"
import { ConnectWallet, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react"
import { CHARACTERS_ADDRESS } from "../const/contractAddresses"
import { useRouter } from "next/router"
import MintContainer from "../components/MintContainer"

const Home: NextPage = () => {
    const { contract: editionDrop } = useContract(CHARACTERS_ADDRESS, "edition-drop")

    const address = useAddress()
    const router = useRouter()

    const { data: ownedNFTs, isLoading, isError } = useOwnedNFTs(editionDrop, address)

    // 0. wallet Connect - require to check of they own an NFT
    if (!address) {
        return (
            <div className={styles.container}>
                <ConnectWallet />
            </div>
        )
    }

    // 1. Loading
    if (isLoading) {
        return <div>Loading...</div>
    }

    // Something went wrong
    if (!ownedNFTs || isError) {
        return <div>Something went wrong</div>
    }

    // 2. No NFTs - Mint page
    if (ownedNFTs.length === 0) {
        return (
            <div className={styles.container}>
                <MintContainer />
            </div>
        )
    }

    // 3. Has NFTs already - show button to take to game
    return (
        <div className={styles.container}>
            <button
                className={`${styles.mainButton} ${styles.spacerBottom} `}
                onClick={() => router.push(`/play`)}
            >
                Play Game
            </button>
        </div>
    )
}

export default Home
