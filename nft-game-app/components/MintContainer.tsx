import { useAddress, useClaimNFT, useContract, Web3Button } from "@thirdweb-dev/react"
import React from "react"
import Image from "next/image"
import { CHARACTERS_ADDRESS } from "../const/contractAddresses"
import styles from "../styles/Home.module.css"
export default function MintContainer() {
    const address = useAddress()
    const { contract: editionDrop } = useContract(CHARACTERS_ADDRESS, "edition-drop")
    const { mutate: claim } = useClaimNFT(editionDrop)

    return (
        <div className={styles.collectionContainer}>
            <h1>Edition Drop</h1>
            <p>Claim Your Character NFT to start playing!</p>
            <div className={`${styles.mainButton} ${styles.spacerBottom}`}>
                <img src="/mine.gif" style={{ height: 200 }} alt="mine" />
            </div>

            <Web3Button
                contractAddress={CHARACTERS_ADDRESS}
                action={() => {
                    claim({
                        quantity: 1,
                        to: address!,
                        tokenId: 0,
                    })
                }}
                theme="dark"
            >
                Claim NFT
            </Web3Button>
        </div>
    )
}
