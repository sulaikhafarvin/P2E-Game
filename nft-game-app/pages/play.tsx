import { ConnectWallet, useAddress, useContract, useMetamask } from "@thirdweb-dev/react"
import React from "react"
import styles from "../styles/Home.module.css"
import CurrentGear from "../components/CurrentGear"
import LoadingSection from "../components/LoadingSection"
import Shop from "../components/Shop"
import Rewards from "../components/Rewards"
import OwnedGear from "../components/OwnedGear"
import {
    CHARACTERS_ADDRESS,
    PICKAXES_ADDRESS,
    GEMS_ADDRESS,
    MINING_ADDRESS,
} from "../const/contractAddresses"

export default function Play() {
    const address = useAddress()
    const { contract: miningContract } = useContract(MINING_ADDRESS)
    const { contract: characterContract } = useContract(CHARACTERS_ADDRESS, "edition-drop")
    const { contract: pickaxeContract } = useContract(PICKAXES_ADDRESS, "edition-drop")
    const { contract: tokenContract } = useContract(GEMS_ADDRESS, "token")

    if (!address) {
        return (
            <div className={styles.container}>
                <ConnectWallet />
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {miningContract && characterContract && pickaxeContract && tokenContract ? (
                <div className={styles.mainSection}>
                    <CurrentGear
                        miningContract={miningContract}
                        characterContract={characterContract}
                        pickaxeContract={pickaxeContract}
                    />
                    <Rewards miningContract={miningContract} tokenContract={tokenContract} />
                </div>
            ) : (
                <LoadingSection />
            )}
            <hr className={`${styles.divider} ${styles.bigSpacerTop}`} />

            {pickaxeContract && miningContract ? (
                <>
                    <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>
                        Your Owned Pickaxes
                    </h2>

                    <div className={styles.shop}>
                        <OwnedGear
                            miningContract={miningContract}
                            pickaxeContract={pickaxeContract}
                        />
                    </div>
                </>
            ) : (
                <LoadingSection />
            )}
            <hr className={`${styles.divider} ${styles.bigSpacerTop}`} />

            {pickaxeContract && tokenContract ? (
                <>
                    <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>Shop</h2>

                    <div className={styles.shop}>
                        <Shop pickaxeContract={pickaxeContract} />
                    </div>
                </>
            ) : (
                <LoadingSection />
            )}
        </div>
    )
}
