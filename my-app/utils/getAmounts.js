import { Contract, providers } from "ethers"
import {
  EXCHANGE_CONTRACT_ABI,
  EXCHANGE_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ABI,
  TOKEN_CONTRACT_ADDRESS,
} from "../constants"

/**
 * getEtherBalance: Retrieves the ether balance of the user or the contract
 */
export const getEtherBalance = async (provider, address, contract = false) => {
  try {
    if (contract) {
      const balance = await provider.getBalance(EXCHANGE_CONTRACT_ADDRESS)
      return balance
    } else {
      const balance = await provider.getBalance(address)
      return balance
    }
  } catch (err) {
    console.error(err)
    return 0
  }
}

/**
 * getCDTokensBalance : Retrives the CryptoDev tokens int the account of the provided address
 *
 */

export const getCDTokensBalance = async (provider, address) => {
  try {
    const tokenContract = new Contract(
      TOKEN_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_ABI,
      provider
    )
    const balanceOfCryptoDevTokens = await tokenContract.balanceOf(address)
    return balanceOfCryptoDevTokens
  } catch (error) {
    console.error(error)
  }
}

export const getLPTokensBalance = async (provider, address) => {
  try {
    const exchangeContract = new Contract(
      EXCHANGE_CONTRACT_ADDRESS,
      EXCHANGE_CONTRACT_ABI,
      provider
    )
    const balanceOfLPTokens = await exchangeContract.balanceOf(address)
    return balanceOfLPTokens
  } catch (error) {
    console.error(error)
  }
}

export const getReserveOfCDTokens = async (provider) => {
  try {
    const exchangeContract = new Contract(
      EXCHANGE_CONTRACT_ADDRESS,
      EXCHANGE_CONTRACT_ABI,
      provider
    )
    const reserve = exchangeContract.getReserve()
    return reserve
  } catch (error) {
    console.error(error)
  }
}
