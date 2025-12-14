import { assertBidAboveMSP } from "../core/msp"

function testBidBelowMSP() {
  try {
    assertBidAboveMSP(1500, 2000)
    throw new Error("FAIL: Bid below MSP was accepted")
  } catch {
    console.log("PASS: Bid below MSP rejected")
  }
}

function testBidAboveMSP() {
  assertBidAboveMSP(2500, 2000)
  console.log("PASS: Bid above MSP accepted")
}

testBidBelowMSP()
testBidAboveMSP()