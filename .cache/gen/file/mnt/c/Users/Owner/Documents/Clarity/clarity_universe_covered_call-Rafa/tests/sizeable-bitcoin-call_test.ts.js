import { Clarinet, Tx, types } from 'https://deno.land/x/clarinet@v1.5.4/index.ts';
// import { ClarityValue } from '@stacks/transactions';
// Define the createResponse function
// function createResponse(isOk: boolean): ClarityValue {
//   if (isOk) {
//     return {
//       type: 'response',
//       success: true,
//       value: { type: 'bool', value: true },
//     };
//   } else {
//     return {
//       type: 'response',
//       success: false,
//       value: { type: 'uint', value: 1 },
//     };
//   }
// }
Clarinet.test({
    name: "First few tests - need to catch errors - deployer transfers u5 - wallet1 exercises u5 - advance - Deployer re-claims u2",
    async fn (chain, accounts) {
        // arrange: set up the chain, state, and other required elements
        let deployer = accounts.get("deployer");
        let wallet1 = accounts.get("wallet_1");
        let wallet2 = accounts.get("wallet_2");
        const contractAddress = deployer.address + '.sbtc';
        const contractAddressCall = deployer.address + '.sizeable-bitcoin-call';
        let block1 = chain.mineBlock([
            // print myself 0.19 SBTC, a call option locks 0.03 sBTC
            Tx.contractCall('sbtc', 'mint', [
                types.uint(19000000),
                types.principal(deployer.address)
            ], deployer.address),
            // print 5 sBTC call options strike 1000 STX each
            Tx.contractCall('sizeable-bitcoin-call', 'mint', [
                types.principal(contractAddress),
                types.uint(15000000),
                types.uint(1000000000)
            ], deployer.address),
            // Transfer u1 u3 and u5 to wallet 1
            Tx.contractCall('sizeable-bitcoin-call', 'transfer', [
                types.uint(1),
                types.principal(deployer.address),
                types.principal(wallet1.address)
            ], deployer.address),
            Tx.contractCall('sizeable-bitcoin-call', 'transfer', [
                types.uint(3),
                types.principal(deployer.address),
                types.principal(wallet1.address)
            ], deployer.address),
            Tx.contractCall('sizeable-bitcoin-call', 'transfer', [
                types.uint(5),
                types.principal(deployer.address),
                types.principal(wallet1.address)
            ], deployer.address)
        ]);
        // // print the munitions sBTC
        // console.log("printing 19m sats........", block1.receipts[0].events);
        // console.log("result of printing........", block1.receipts[0].result);
        // // print the calls
        // console.log("printing 5 call options........ is 3 tokens and 1 ft sBTC transfer", block1.receipts[1].events);
        // transfer u1 u3 and u5 to wallet 1
        console.log("1 - 22222222222222........", block1.receipts[2].events);
        console.log("3 - 333333333333333........", block1.receipts[3].events);
        console.log("5 - 44444444444444........", block1.receipts[4].events);
        // console.log("print the height...", block1.height);
        // assertEquals(block1.height, 3);
        let block2 = chain.mineBlock([
            // exercise u5
            Tx.contractCall('sizeable-bitcoin-call', 'exercise', [
                types.principal(contractAddress),
                types.uint(5)
            ], wallet1.address)
        ]);
        console.log("printing exercising u5........", block2.receipts[0].events);
        console.log("printing exercising u5........", block2.receipts[0].result);
        // open AI is incredible! it will advance and allow me to learn so quickly... being early is a huge advantage with  open AI on my side and this amazing community
        // let's work, compound and deploy common goods for a better DeFi world and squeeze those wall garden gatekeepers out of the market
        console.log("Print the height of block 2...", block2.height);
        chain.mineEmptyBlock(2100); // options expired now!
        let block3 = chain.mineBlock([
            // reclaim u2 baby!
            // Tx.contractCall('sizeable-bitcoin-call', 'reclaim-yy', [types.uint(2), "(ok true)"], deployer.address)
            // not able to run the line above?
            Tx.contractCall('sizeable-bitcoin-call', 'counterparty-reclaim', [
                types.principal(contractAddress),
                types.uint(2)
            ], deployer.address)
        ]);
        console.log("reclaiming u2........", block3.receipts[0].events);
        console.log("reclaiming u2 result........", block3.receipts[0].result);
        console.log("Print the height of block 3...", block3.height);
    // // act: perform actions related to the current test
    // let block = chain.mineBlock([
    //     /*
    //      * Add transactions with:
    //      * Tx.contractCall(...)
    //     */
    // ]);
    // // assert: review returned data, contract state, and other requirements
    // assertEquals(block.receipts.length, 0);
    // assertEquals(block.height, 2);
    // // TODO
    // assertEquals("TODO", "a complete test");
    }
});
Clarinet.test({
    name: " Wallet1 exercises them all in 1 go (1, 3 and 5) ",
    async fn (chain, accounts) {
        // arrange: set up the chain, state, and other required elements
        let deployer = accounts.get("deployer");
        let wallet1 = accounts.get("wallet_1");
        let wallet2 = accounts.get("wallet_2");
        const contractAddress = deployer.address + '.sbtc';
        const contractAddressCall = deployer.address + '.sizeable-bitcoin-call';
        let block1 = chain.mineBlock([
            // print myself 0.19 SBTC, a call option locks 0.03 sBTC
            Tx.contractCall('sbtc', 'mint', [
                types.uint(19000000),
                types.principal(deployer.address)
            ], deployer.address),
            // print 5 sBTC call options strike 1000 STX each
            Tx.contractCall('sizeable-bitcoin-call', 'mint', [
                types.principal(contractAddress),
                types.uint(15000000),
                types.uint(1000000000)
            ], deployer.address),
            // Transfer u1 u3 and u5 to wallet 1
            Tx.contractCall('sizeable-bitcoin-call', 'transfer', [
                types.uint(1),
                types.principal(deployer.address),
                types.principal(wallet1.address)
            ], deployer.address),
            Tx.contractCall('sizeable-bitcoin-call', 'transfer', [
                types.uint(3),
                types.principal(deployer.address),
                types.principal(wallet1.address)
            ], deployer.address),
            Tx.contractCall('sizeable-bitcoin-call', 'transfer', [
                types.uint(5),
                types.principal(deployer.address),
                types.principal(wallet1.address)
            ], deployer.address)
        ]);
        // // print the munitions sBTC
        // console.log("printing 19m sats........", block1.receipts[0].events);
        // console.log("result of printing........", block1.receipts[0].result);
        // // print the calls
        // console.log("printing 5 call options........ is 3 tokens and 1 ft sBTC transfer", block1.receipts[1].events);
        // transfer u1 u3 and u5 to wallet 1
        // console.log("1 - 22222222222222........", block1.receipts[2].events);
        // console.log("3 - 333333333333333........", block1.receipts[3].events);
        // console.log("5 - 44444444444444........", block1.receipts[4].events);
        // console.log("print the height...", block1.height);
        // assertEquals(block1.height, 3);
        let block2 = chain.mineBlock([
            // exercise u5
            Tx.contractCall('sizeable-bitcoin-call', 'exercise-all-of-my-exerciser-calls', [
                types.principal(contractAddress)
            ], wallet1.address)
        ]);
        console.log("printing exercising u1........", block2.receipts[0].events);
        // console.log("printing exercising u3........", block2.receipts[1].events);
        // console.log("printing exercising u5........", block2.receipts[2].events);
        // open AI is incredible! it will advance and allow me to learn so quickly... being early is a huge advantage with  open AI on my side and this amazing community
        // let's work, compound and deploy common goods for a better DeFi world and squeeze those wall garden gatekeepers out of the market
        console.log("Print the height of block 2...", block2.height);
        chain.mineEmptyBlock(2100); // options expired now!
        let block3 = chain.mineBlock([
            Tx.contractCall('sizeable-bitcoin-call', 'counterparty-reclaim', [
                types.principal(contractAddress),
                types.uint(1)
            ], deployer.address)
        ]);
        block3.receipts[0].result.expectErr().expectUint(1007); // token id not found because it was exercised and burnt so deployer cannot reclaim it
    }
});
Clarinet.test({
    name: " Deployer cannot reclaim option which is not expired ",
    async fn (chain, accounts) {
        // arrange: set up the chain, state, and other required elements
        let deployer = accounts.get("deployer");
        let wallet1 = accounts.get("wallet_1");
        let wallet2 = accounts.get("wallet_2");
        const contractAddress = deployer.address + '.sbtc';
        const contractAddressCall = deployer.address + '.sizeable-bitcoin-call';
        let block1 = chain.mineBlock([
            // print myself 0.19 SBTC, a call option locks 0.03 sBTC
            Tx.contractCall('sbtc', 'mint', [
                types.uint(19000000),
                types.principal(deployer.address)
            ], deployer.address),
            // print 5 sBTC call options strike 1000 STX each
            Tx.contractCall('sizeable-bitcoin-call', 'mint', [
                types.principal(contractAddress),
                types.uint(15000000),
                types.uint(1000000000)
            ], deployer.address),
            // Transfer u1 u3 and u5 to wallet 1
            Tx.contractCall('sizeable-bitcoin-call', 'transfer', [
                types.uint(1),
                types.principal(deployer.address),
                types.principal(wallet1.address)
            ], deployer.address),
            Tx.contractCall('sizeable-bitcoin-call', 'transfer', [
                types.uint(3),
                types.principal(deployer.address),
                types.principal(wallet1.address)
            ], deployer.address),
            Tx.contractCall('sizeable-bitcoin-call', 'transfer', [
                types.uint(5),
                types.principal(deployer.address),
                types.principal(wallet1.address)
            ], deployer.address)
        ]);
        // // print the munitions sBTC
        // console.log("printing 19m sats........", block1.receipts[0].events);
        // console.log("result of printing........", block1.receipts[0].result);
        // // print the calls
        // console.log("printing 5 call options........ is 3 tokens and 1 ft sBTC transfer", block1.receipts[1].events);
        // transfer u1 u3 and u5 to wallet 1
        // console.log("1 - 22222222222222........", block1.receipts[2].events);
        // console.log("3 - 333333333333333........", block1.receipts[3].events);
        // console.log("5 - 44444444444444........", block1.receipts[4].events);
        // console.log("print the height...", block1.height);
        // assertEquals(block1.height, 3);
        //         let block2 = chain.mineBlock([
        //         // exercise u5
        // Tx.contractCall('sizeable-bitcoin-call', 'exercise-all-of-my-exerciser-calls', [types.principal(contractAddress)], wallet1.address)
        //  // where is the Xbtc contract?
        //         ]); 
        //         console.log("printing exercising u1........", block2.receipts[0].events);
        // console.log("printing exercising u3........", block2.receipts[1].events);
        // console.log("printing exercising u5........", block2.receipts[2].events);
        // open AI is incredible! it will advance and allow me to learn so quickly... being early is a huge advantage with  open AI on my side and this amazing community
        // let's work, compound and deploy common goods for a better DeFi world and squeeze those wall garden gatekeepers out of the market
        // console.log("Print the height of block 2...", block2.height);
        // chain.mineEmptyBlock(2100); // options expired now!
        let block3 = chain.mineBlock([
            Tx.contractCall('sizeable-bitcoin-call', 'counterparty-reclaim', [
                types.principal(contractAddress),
                types.uint(1)
            ], deployer.address)
        ]);
        block3.receipts[0].result.expectErr().expectUint(1012); // deployer cannot reclaim it as it desn't belong to him and it's not expired
    }
});
Clarinet.test({
    name: " Testing the reclaim them all",
    async fn (chain, accounts) {
        // arrange: set up the chain, state, and other required elements
        let deployer = accounts.get("deployer");
        let wallet1 = accounts.get("wallet_1");
        let wallet2 = accounts.get("wallet_2");
        const contractAddress = deployer.address + '.sbtc';
        const contractAddressCall = deployer.address + '.sizeable-bitcoin-call';
        let block1 = chain.mineBlock([
            // print myself 0.19 SBTC, a call option locks 0.03 sBTC
            Tx.contractCall('sbtc', 'mint', [
                types.uint(19000000),
                types.principal(deployer.address)
            ], deployer.address),
            // print 5 sBTC call options strike 1000 STX each
            Tx.contractCall('sizeable-bitcoin-call', 'mint', [
                types.principal(contractAddress),
                types.uint(15000000),
                types.uint(1000000000)
            ], deployer.address),
            // Transfer u1 u3 and u5 to wallet 1
            Tx.contractCall('sizeable-bitcoin-call', 'transfer', [
                types.uint(1),
                types.principal(deployer.address),
                types.principal(wallet1.address)
            ], deployer.address),
            Tx.contractCall('sizeable-bitcoin-call', 'transfer', [
                types.uint(3),
                types.principal(deployer.address),
                types.principal(wallet1.address)
            ], deployer.address),
            Tx.contractCall('sizeable-bitcoin-call', 'transfer', [
                types.uint(5),
                types.principal(deployer.address),
                types.principal(wallet1.address)
            ], deployer.address)
        ]);
        // // print the munitions sBTC
        // console.log("printing 19m sats........", block1.receipts[0].events);
        // console.log("result of printing........", block1.receipts[0].result);
        // // print the calls
        // console.log("printing 5 call options........ is 3 tokens and 1 ft sBTC transfer", block1.receipts[1].events);
        // transfer u1 u3 and u5 to wallet 1
        // console.log("1 - 22222222222222........", block1.receipts[2].events);
        // console.log("3 - 333333333333333........", block1.receipts[3].events);
        // console.log("5 - 44444444444444........", block1.receipts[4].events);
        // console.log("print the height...", block1.height);
        // assertEquals(block1.height, 3);
        let block2 = chain.mineBlock([
            // exercise u5
            Tx.contractCall('sizeable-bitcoin-call', 'exercise-all-of-my-exerciser-calls', [
                types.principal(contractAddress)
            ], wallet1.address)
        ]);
        console.log("printing exercising u1........", block2.receipts[0].events);
        // console.log("printing exercising u3........", block2.receipts[1].events);
        // console.log("printing exercising u5........", block2.receipts[2].events);
        // open AI is incredible! it will advance and allow me to learn so quickly... being early is a huge advantage with  open AI on my side and this amazing community
        // let's work, compound and deploy common goods for a better DeFi world and squeeze those wall garden gatekeepers out of the market
        // console.log("Print the height of block 2...", block2.height);
        chain.mineEmptyBlock(4200); // options expired now!
        let deployerReclaim = chain.callReadOnlyFn('sizeable-bitcoin-call', 'get-reclaimable-calls', [
            types.principal(deployer.address)
        ], deployer.address);
        console.log("Get deployer reclaimable calls.. ", deployerReclaim);
        // wallet1Balance.result.expectOk().expectUint(123456); 
        let block3 = chain.mineBlock([
            Tx.contractCall(contractAddressCall, 'reclaiming', [], deployer.address) // such a waste of time, but if I don't pass empty params [] then I get "error: TypeError: Error parsing args at position 0: invalid length 0, expected struct TransactionArgs with 4 elements"
        ]);
        console.log("deployer reclaims all expired options.......", block3.receipts[0].events);
        console.log("print the height...", block3.height);
    //     // block3.receipts[0].result.expectErr().expectUint(1007); // token id not found because it was exercised and burnt so deployer cannot reclaim it
    }
}); // we have to filter items out of reclaimable (from counterparty) when it is exercised!
 // no because when token is not found, 
 // before that let's just test it when none are exercised!
 // revise if I need a list for all calls, and a map for exercisable calls - yes I do because of what?
 // I probably don't so I need to merge the 2?
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vbW50L2MvVXNlcnMvT3duZXIvRG9jdW1lbnRzL0NsYXJpdHkvY2xhcml0eV91bml2ZXJzZV9jb3ZlcmVkX2NhbGwtUmFmYS90ZXN0cy9zaXplYWJsZS1iaXRjb2luLWNhbGxfdGVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IENsYXJpbmV0LCBUeCwgQ2hhaW4sIEFjY291bnQsIHR5cGVzIH0gZnJvbSAnaHR0cHM6Ly9kZW5vLmxhbmQveC9jbGFyaW5ldEB2MS41LjQvaW5kZXgudHMnO1xuaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSAnaHR0cHM6Ly9kZW5vLmxhbmQvc3RkQDAuMTcwLjAvdGVzdGluZy9hc3NlcnRzLnRzJztcbi8vIGltcG9ydCB7IENsYXJpdHlWYWx1ZSB9IGZyb20gJ0BzdGFja3MvdHJhbnNhY3Rpb25zJztcblxuLy8gRGVmaW5lIHRoZSBjcmVhdGVSZXNwb25zZSBmdW5jdGlvblxuLy8gZnVuY3Rpb24gY3JlYXRlUmVzcG9uc2UoaXNPazogYm9vbGVhbik6IENsYXJpdHlWYWx1ZSB7XG4vLyAgIGlmIChpc09rKSB7XG4vLyAgICAgcmV0dXJuIHtcbi8vICAgICAgIHR5cGU6ICdyZXNwb25zZScsXG4vLyAgICAgICBzdWNjZXNzOiB0cnVlLFxuLy8gICAgICAgdmFsdWU6IHsgdHlwZTogJ2Jvb2wnLCB2YWx1ZTogdHJ1ZSB9LFxuLy8gICAgIH07XG4vLyAgIH0gZWxzZSB7XG4vLyAgICAgcmV0dXJuIHtcbi8vICAgICAgIHR5cGU6ICdyZXNwb25zZScsXG4vLyAgICAgICBzdWNjZXNzOiBmYWxzZSxcbi8vICAgICAgIHZhbHVlOiB7IHR5cGU6ICd1aW50JywgdmFsdWU6IDEgfSxcbi8vICAgICB9O1xuLy8gICB9XG4vLyB9XG5cbkNsYXJpbmV0LnRlc3Qoe1xuICAgIG5hbWU6IFwiRmlyc3QgZmV3IHRlc3RzIC0gbmVlZCB0byBjYXRjaCBlcnJvcnMgLSBkZXBsb3llciB0cmFuc2ZlcnMgdTUgLSB3YWxsZXQxIGV4ZXJjaXNlcyB1NSAtIGFkdmFuY2UgLSBEZXBsb3llciByZS1jbGFpbXMgdTJcIixcbiAgICBhc3luYyBmbihjaGFpbjogQ2hhaW4sIGFjY291bnRzOiBNYXA8c3RyaW5nLCBBY2NvdW50Pikge1xuICAgICAgICAvLyBhcnJhbmdlOiBzZXQgdXAgdGhlIGNoYWluLCBzdGF0ZSwgYW5kIG90aGVyIHJlcXVpcmVkIGVsZW1lbnRzXG4gICAgICAgIGxldCBkZXBsb3llciA9IGFjY291bnRzLmdldChcImRlcGxveWVyXCIpITtcbiAgICAgICAgbGV0IHdhbGxldDEgPSBhY2NvdW50cy5nZXQoXCJ3YWxsZXRfMVwiKSE7XG4gICAgICAgIGxldCB3YWxsZXQyID0gYWNjb3VudHMuZ2V0KFwid2FsbGV0XzJcIikhO1xuICAgICAgICBjb25zdCBjb250cmFjdEFkZHJlc3MgPSBkZXBsb3llci5hZGRyZXNzICsgJy5zYnRjJztcbiAgICAgICAgY29uc3QgY29udHJhY3RBZGRyZXNzQ2FsbCA9IGRlcGxveWVyLmFkZHJlc3MgKyAnLnNpemVhYmxlLWJpdGNvaW4tY2FsbCc7XG5cbiAgICAgICAgbGV0IGJsb2NrMSA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICAgICAgICAvLyBwcmludCBteXNlbGYgMC4xOSBTQlRDLCBhIGNhbGwgb3B0aW9uIGxvY2tzIDAuMDMgc0JUQ1xuVHguY29udHJhY3RDYWxsKCdzYnRjJywgJ21pbnQnLCBbdHlwZXMudWludCgxOTAwMDAwMCksIHR5cGVzLnByaW5jaXBhbChkZXBsb3llci5hZGRyZXNzKV0sIGRlcGxveWVyLmFkZHJlc3MpLFxuICAgICAgICAgICAgICAgICAgICAvLyBwcmludCA1IHNCVEMgY2FsbCBvcHRpb25zIHN0cmlrZSAxMDAwIFNUWCBlYWNoXG5UeC5jb250cmFjdENhbGwoJ3NpemVhYmxlLWJpdGNvaW4tY2FsbCcsICdtaW50JywgW3R5cGVzLnByaW5jaXBhbChjb250cmFjdEFkZHJlc3MpLCB0eXBlcy51aW50KDE1MDAwMDAwKSwgdHlwZXMudWludCgxMDAwMDAwMDAwKV0sIGRlcGxveWVyLmFkZHJlc3MpLFxuICAgICAgICAgICAgLy8gVHJhbnNmZXIgdTEgdTMgYW5kIHU1IHRvIHdhbGxldCAxXG5UeC5jb250cmFjdENhbGwoJ3NpemVhYmxlLWJpdGNvaW4tY2FsbCcsICd0cmFuc2ZlcicsIFt0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwoZGVwbG95ZXIuYWRkcmVzcyksIHR5cGVzLnByaW5jaXBhbCh3YWxsZXQxLmFkZHJlc3MpXSwgZGVwbG95ZXIuYWRkcmVzcyksXG5UeC5jb250cmFjdENhbGwoJ3NpemVhYmxlLWJpdGNvaW4tY2FsbCcsICd0cmFuc2ZlcicsIFt0eXBlcy51aW50KDMpLCB0eXBlcy5wcmluY2lwYWwoZGVwbG95ZXIuYWRkcmVzcyksIHR5cGVzLnByaW5jaXBhbCh3YWxsZXQxLmFkZHJlc3MpXSwgZGVwbG95ZXIuYWRkcmVzcyksXG5UeC5jb250cmFjdENhbGwoJ3NpemVhYmxlLWJpdGNvaW4tY2FsbCcsICd0cmFuc2ZlcicsIFt0eXBlcy51aW50KDUpLCB0eXBlcy5wcmluY2lwYWwoZGVwbG95ZXIuYWRkcmVzcyksIHR5cGVzLnByaW5jaXBhbCh3YWxsZXQxLmFkZHJlc3MpXSwgZGVwbG95ZXIuYWRkcmVzcylcbiAgICAgICAgICAgIC8vIElkZWE6IGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgdHJhbnNmZXJzIGEgbGlzdCBvZiB0b2tlbnMgaW4gMSBnbyFcbiAgICAgICAgXSk7XG4gICAgICAgIC8vIC8vIHByaW50IHRoZSBtdW5pdGlvbnMgc0JUQ1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInByaW50aW5nIDE5bSBzYXRzLi4uLi4uLi5cIiwgYmxvY2sxLnJlY2VpcHRzWzBdLmV2ZW50cyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVzdWx0IG9mIHByaW50aW5nLi4uLi4uLi5cIiwgYmxvY2sxLnJlY2VpcHRzWzBdLnJlc3VsdCk7XG4gICAgICAgIC8vIC8vIHByaW50IHRoZSBjYWxsc1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInByaW50aW5nIDUgY2FsbCBvcHRpb25zLi4uLi4uLi4gaXMgMyB0b2tlbnMgYW5kIDEgZnQgc0JUQyB0cmFuc2ZlclwiLCBibG9jazEucmVjZWlwdHNbMV0uZXZlbnRzKTtcbiAgICAgICAgLy8gdHJhbnNmZXIgdTEgdTMgYW5kIHU1IHRvIHdhbGxldCAxXG4gICAgICAgIGNvbnNvbGUubG9nKFwiMSAtIDIyMjIyMjIyMjIyMjIyLi4uLi4uLi5cIiwgYmxvY2sxLnJlY2VpcHRzWzJdLmV2ZW50cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiMyAtIDMzMzMzMzMzMzMzMzMzMy4uLi4uLi4uXCIsIGJsb2NrMS5yZWNlaXB0c1szXS5ldmVudHMpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIjUgLSA0NDQ0NDQ0NDQ0NDQ0NC4uLi4uLi4uXCIsIGJsb2NrMS5yZWNlaXB0c1s0XS5ldmVudHMpO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicHJpbnQgdGhlIGhlaWdodC4uLlwiLCBibG9jazEuaGVpZ2h0KTtcbiAgICAgICAgLy8gYXNzZXJ0RXF1YWxzKGJsb2NrMS5oZWlnaHQsIDMpO1xuXG4gICAgICAgIGxldCBibG9jazIgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgICAvLyBleGVyY2lzZSB1NVxuVHguY29udHJhY3RDYWxsKCdzaXplYWJsZS1iaXRjb2luLWNhbGwnLCAnZXhlcmNpc2UnLCBbdHlwZXMucHJpbmNpcGFsKGNvbnRyYWN0QWRkcmVzcyksIHR5cGVzLnVpbnQoNSldLCB3YWxsZXQxLmFkZHJlc3MpXG4gLy8gd2hlcmUgaXMgdGhlIFhidGMgY29udHJhY3Q/XG4gICAgICAgIF0pOyBcbiAgICAgICAgY29uc29sZS5sb2coXCJwcmludGluZyBleGVyY2lzaW5nIHU1Li4uLi4uLi5cIiwgYmxvY2syLnJlY2VpcHRzWzBdLmV2ZW50cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicHJpbnRpbmcgZXhlcmNpc2luZyB1NS4uLi4uLi4uXCIsIGJsb2NrMi5yZWNlaXB0c1swXS5yZXN1bHQpO1xuICAgICAgICBcbiAgICAgICAgLy8gb3BlbiBBSSBpcyBpbmNyZWRpYmxlISBpdCB3aWxsIGFkdmFuY2UgYW5kIGFsbG93IG1lIHRvIGxlYXJuIHNvIHF1aWNrbHkuLi4gYmVpbmcgZWFybHkgaXMgYSBodWdlIGFkdmFudGFnZSB3aXRoICBvcGVuIEFJIG9uIG15IHNpZGUgYW5kIHRoaXMgYW1hemluZyBjb21tdW5pdHlcbiAgICAgICAgLy8gbGV0J3Mgd29yaywgY29tcG91bmQgYW5kIGRlcGxveSBjb21tb24gZ29vZHMgZm9yIGEgYmV0dGVyIERlRmkgd29ybGQgYW5kIHNxdWVlemUgdGhvc2Ugd2FsbCBnYXJkZW4gZ2F0ZWtlZXBlcnMgb3V0IG9mIHRoZSBtYXJrZXRcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlByaW50IHRoZSBoZWlnaHQgb2YgYmxvY2sgMi4uLlwiLCBibG9jazIuaGVpZ2h0KTtcblxuICAgICAgICBjaGFpbi5taW5lRW1wdHlCbG9jaygyMTAwKTsgLy8gb3B0aW9ucyBleHBpcmVkIG5vdyFcbiAgICAgICAgbGV0IGJsb2NrMyA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICAgIC8vIHJlY2xhaW0gdTIgYmFieSFcbi8vIFR4LmNvbnRyYWN0Q2FsbCgnc2l6ZWFibGUtYml0Y29pbi1jYWxsJywgJ3JlY2xhaW0teXknLCBbdHlwZXMudWludCgyKSwgXCIob2sgdHJ1ZSlcIl0sIGRlcGxveWVyLmFkZHJlc3MpXG4vLyBub3QgYWJsZSB0byBydW4gdGhlIGxpbmUgYWJvdmU/XG5UeC5jb250cmFjdENhbGwoJ3NpemVhYmxlLWJpdGNvaW4tY2FsbCcsICdjb3VudGVycGFydHktcmVjbGFpbScsIFt0eXBlcy5wcmluY2lwYWwoY29udHJhY3RBZGRyZXNzKSwgdHlwZXMudWludCgyKV0sIGRlcGxveWVyLmFkZHJlc3MpXG4gICAgICAgIF0pOyBcbiAgICAgICAgY29uc29sZS5sb2coXCJyZWNsYWltaW5nIHUyLi4uLi4uLi5cIiwgYmxvY2szLnJlY2VpcHRzWzBdLmV2ZW50cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVjbGFpbWluZyB1MiByZXN1bHQuLi4uLi4uLlwiLCBibG9jazMucmVjZWlwdHNbMF0ucmVzdWx0KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJQcmludCB0aGUgaGVpZ2h0IG9mIGJsb2NrIDMuLi5cIiwgYmxvY2szLmhlaWdodCk7XG4gICAgICAgIC8vIC8vIGFjdDogcGVyZm9ybSBhY3Rpb25zIHJlbGF0ZWQgdG8gdGhlIGN1cnJlbnQgdGVzdFxuICAgICAgICAvLyBsZXQgYmxvY2sgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgICAvLyAgICAgLypcbiAgICAgICAgLy8gICAgICAqIEFkZCB0cmFuc2FjdGlvbnMgd2l0aDpcbiAgICAgICAgLy8gICAgICAqIFR4LmNvbnRyYWN0Q2FsbCguLi4pXG4gICAgICAgIC8vICAgICAqL1xuICAgICAgICAvLyBdKTtcblxuICAgICAgICAvLyAvLyBhc3NlcnQ6IHJldmlldyByZXR1cm5lZCBkYXRhLCBjb250cmFjdCBzdGF0ZSwgYW5kIG90aGVyIHJlcXVpcmVtZW50c1xuICAgICAgICAvLyBhc3NlcnRFcXVhbHMoYmxvY2sucmVjZWlwdHMubGVuZ3RoLCAwKTtcbiAgICAgICAgLy8gYXNzZXJ0RXF1YWxzKGJsb2NrLmhlaWdodCwgMik7XG5cbiAgICAgICAgLy8gLy8gVE9ET1xuICAgICAgICAvLyBhc3NlcnRFcXVhbHMoXCJUT0RPXCIsIFwiYSBjb21wbGV0ZSB0ZXN0XCIpO1xuICAgIH0sXG59KTtcblxuXG5DbGFyaW5ldC50ZXN0KHtcbiAgICBuYW1lOiBcIiBXYWxsZXQxIGV4ZXJjaXNlcyB0aGVtIGFsbCBpbiAxIGdvICgxLCAzIGFuZCA1KSBcIixcbiAgICBhc3luYyBmbihjaGFpbjogQ2hhaW4sIGFjY291bnRzOiBNYXA8c3RyaW5nLCBBY2NvdW50Pikge1xuICAgICAgICAvLyBhcnJhbmdlOiBzZXQgdXAgdGhlIGNoYWluLCBzdGF0ZSwgYW5kIG90aGVyIHJlcXVpcmVkIGVsZW1lbnRzXG4gICAgICAgIGxldCBkZXBsb3llciA9IGFjY291bnRzLmdldChcImRlcGxveWVyXCIpITtcbiAgICAgICAgbGV0IHdhbGxldDEgPSBhY2NvdW50cy5nZXQoXCJ3YWxsZXRfMVwiKSE7XG4gICAgICAgIGxldCB3YWxsZXQyID0gYWNjb3VudHMuZ2V0KFwid2FsbGV0XzJcIikhO1xuICAgICAgICBjb25zdCBjb250cmFjdEFkZHJlc3MgPSBkZXBsb3llci5hZGRyZXNzICsgJy5zYnRjJztcbiAgICAgICAgY29uc3QgY29udHJhY3RBZGRyZXNzQ2FsbCA9IGRlcGxveWVyLmFkZHJlc3MgKyAnLnNpemVhYmxlLWJpdGNvaW4tY2FsbCc7XG5cbiAgICAgICAgbGV0IGJsb2NrMSA9IGNoYWluLm1pbmVCbG9jayhbXG4gICAgICAgICAgICAvLyBwcmludCBteXNlbGYgMC4xOSBTQlRDLCBhIGNhbGwgb3B0aW9uIGxvY2tzIDAuMDMgc0JUQ1xuVHguY29udHJhY3RDYWxsKCdzYnRjJywgJ21pbnQnLCBbdHlwZXMudWludCgxOTAwMDAwMCksIHR5cGVzLnByaW5jaXBhbChkZXBsb3llci5hZGRyZXNzKV0sIGRlcGxveWVyLmFkZHJlc3MpLFxuICAgICAgICAgICAgICAgICAgICAvLyBwcmludCA1IHNCVEMgY2FsbCBvcHRpb25zIHN0cmlrZSAxMDAwIFNUWCBlYWNoXG5UeC5jb250cmFjdENhbGwoJ3NpemVhYmxlLWJpdGNvaW4tY2FsbCcsICdtaW50JywgW3R5cGVzLnByaW5jaXBhbChjb250cmFjdEFkZHJlc3MpLCB0eXBlcy51aW50KDE1MDAwMDAwKSwgdHlwZXMudWludCgxMDAwMDAwMDAwKV0sIGRlcGxveWVyLmFkZHJlc3MpLFxuICAgICAgICAgICAgLy8gVHJhbnNmZXIgdTEgdTMgYW5kIHU1IHRvIHdhbGxldCAxXG5UeC5jb250cmFjdENhbGwoJ3NpemVhYmxlLWJpdGNvaW4tY2FsbCcsICd0cmFuc2ZlcicsIFt0eXBlcy51aW50KDEpLCB0eXBlcy5wcmluY2lwYWwoZGVwbG95ZXIuYWRkcmVzcyksIHR5cGVzLnByaW5jaXBhbCh3YWxsZXQxLmFkZHJlc3MpXSwgZGVwbG95ZXIuYWRkcmVzcyksXG5UeC5jb250cmFjdENhbGwoJ3NpemVhYmxlLWJpdGNvaW4tY2FsbCcsICd0cmFuc2ZlcicsIFt0eXBlcy51aW50KDMpLCB0eXBlcy5wcmluY2lwYWwoZGVwbG95ZXIuYWRkcmVzcyksIHR5cGVzLnByaW5jaXBhbCh3YWxsZXQxLmFkZHJlc3MpXSwgZGVwbG95ZXIuYWRkcmVzcyksXG5UeC5jb250cmFjdENhbGwoJ3NpemVhYmxlLWJpdGNvaW4tY2FsbCcsICd0cmFuc2ZlcicsIFt0eXBlcy51aW50KDUpLCB0eXBlcy5wcmluY2lwYWwoZGVwbG95ZXIuYWRkcmVzcyksIHR5cGVzLnByaW5jaXBhbCh3YWxsZXQxLmFkZHJlc3MpXSwgZGVwbG95ZXIuYWRkcmVzcylcbiAgICAgICAgICAgIC8vIElkZWE6IGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgdHJhbnNmZXJzIGEgbGlzdCBvZiB0b2tlbnMgaW4gMSBnbyFcbiAgICAgICAgXSk7XG4gICAgICAgIC8vIC8vIHByaW50IHRoZSBtdW5pdGlvbnMgc0JUQ1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInByaW50aW5nIDE5bSBzYXRzLi4uLi4uLi5cIiwgYmxvY2sxLnJlY2VpcHRzWzBdLmV2ZW50cyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVzdWx0IG9mIHByaW50aW5nLi4uLi4uLi5cIiwgYmxvY2sxLnJlY2VpcHRzWzBdLnJlc3VsdCk7XG4gICAgICAgIC8vIC8vIHByaW50IHRoZSBjYWxsc1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInByaW50aW5nIDUgY2FsbCBvcHRpb25zLi4uLi4uLi4gaXMgMyB0b2tlbnMgYW5kIDEgZnQgc0JUQyB0cmFuc2ZlclwiLCBibG9jazEucmVjZWlwdHNbMV0uZXZlbnRzKTtcbiAgICAgICAgLy8gdHJhbnNmZXIgdTEgdTMgYW5kIHU1IHRvIHdhbGxldCAxXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiMSAtIDIyMjIyMjIyMjIyMjIyLi4uLi4uLi5cIiwgYmxvY2sxLnJlY2VpcHRzWzJdLmV2ZW50cyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiMyAtIDMzMzMzMzMzMzMzMzMzMy4uLi4uLi4uXCIsIGJsb2NrMS5yZWNlaXB0c1szXS5ldmVudHMpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIjUgLSA0NDQ0NDQ0NDQ0NDQ0NC4uLi4uLi4uXCIsIGJsb2NrMS5yZWNlaXB0c1s0XS5ldmVudHMpO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicHJpbnQgdGhlIGhlaWdodC4uLlwiLCBibG9jazEuaGVpZ2h0KTtcbiAgICAgICAgLy8gYXNzZXJ0RXF1YWxzKGJsb2NrMS5oZWlnaHQsIDMpO1xuXG4gICAgICAgIGxldCBibG9jazIgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgICAvLyBleGVyY2lzZSB1NVxuVHguY29udHJhY3RDYWxsKCdzaXplYWJsZS1iaXRjb2luLWNhbGwnLCAnZXhlcmNpc2UtYWxsLW9mLW15LWV4ZXJjaXNlci1jYWxscycsIFt0eXBlcy5wcmluY2lwYWwoY29udHJhY3RBZGRyZXNzKV0sIHdhbGxldDEuYWRkcmVzcylcbiAvLyB3aGVyZSBpcyB0aGUgWGJ0YyBjb250cmFjdD9cbiAgICAgICAgXSk7IFxuICAgICAgICBjb25zb2xlLmxvZyhcInByaW50aW5nIGV4ZXJjaXNpbmcgdTEuLi4uLi4uLlwiLCBibG9jazIucmVjZWlwdHNbMF0uZXZlbnRzKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJwcmludGluZyBleGVyY2lzaW5nIHUzLi4uLi4uLi5cIiwgYmxvY2syLnJlY2VpcHRzWzFdLmV2ZW50cyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicHJpbnRpbmcgZXhlcmNpc2luZyB1NS4uLi4uLi4uXCIsIGJsb2NrMi5yZWNlaXB0c1syXS5ldmVudHMpO1xuICAgICAgICBcbiAgICAgICAgLy8gb3BlbiBBSSBpcyBpbmNyZWRpYmxlISBpdCB3aWxsIGFkdmFuY2UgYW5kIGFsbG93IG1lIHRvIGxlYXJuIHNvIHF1aWNrbHkuLi4gYmVpbmcgZWFybHkgaXMgYSBodWdlIGFkdmFudGFnZSB3aXRoICBvcGVuIEFJIG9uIG15IHNpZGUgYW5kIHRoaXMgYW1hemluZyBjb21tdW5pdHlcbiAgICAgICAgLy8gbGV0J3Mgd29yaywgY29tcG91bmQgYW5kIGRlcGxveSBjb21tb24gZ29vZHMgZm9yIGEgYmV0dGVyIERlRmkgd29ybGQgYW5kIHNxdWVlemUgdGhvc2Ugd2FsbCBnYXJkZW4gZ2F0ZWtlZXBlcnMgb3V0IG9mIHRoZSBtYXJrZXRcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlByaW50IHRoZSBoZWlnaHQgb2YgYmxvY2sgMi4uLlwiLCBibG9jazIuaGVpZ2h0KTtcblxuICAgICAgICBjaGFpbi5taW5lRW1wdHlCbG9jaygyMTAwKTsgLy8gb3B0aW9ucyBleHBpcmVkIG5vdyFcbiAgICAgICAgbGV0IGJsb2NrMyA9IGNoYWluLm1pbmVCbG9jayhbXG5UeC5jb250cmFjdENhbGwoJ3NpemVhYmxlLWJpdGNvaW4tY2FsbCcsICdjb3VudGVycGFydHktcmVjbGFpbScsIFt0eXBlcy5wcmluY2lwYWwoY29udHJhY3RBZGRyZXNzKSwgdHlwZXMudWludCgxKV0sIGRlcGxveWVyLmFkZHJlc3MpXG5dKTsgXG4gICAgICAgIGJsb2NrMy5yZWNlaXB0c1swXS5yZXN1bHQuZXhwZWN0RXJyKCkuZXhwZWN0VWludCgxMDA3KTsgLy8gdG9rZW4gaWQgbm90IGZvdW5kIGJlY2F1c2UgaXQgd2FzIGV4ZXJjaXNlZCBhbmQgYnVybnQgc28gZGVwbG95ZXIgY2Fubm90IHJlY2xhaW0gaXRcbn0sXG59KTtcblxuQ2xhcmluZXQudGVzdCh7XG4gICAgbmFtZTogXCIgRGVwbG95ZXIgY2Fubm90IHJlY2xhaW0gb3B0aW9uIHdoaWNoIGlzIG5vdCBleHBpcmVkIFwiLFxuICAgIGFzeW5jIGZuKGNoYWluOiBDaGFpbiwgYWNjb3VudHM6IE1hcDxzdHJpbmcsIEFjY291bnQ+KSB7XG4gICAgICAgIC8vIGFycmFuZ2U6IHNldCB1cCB0aGUgY2hhaW4sIHN0YXRlLCBhbmQgb3RoZXIgcmVxdWlyZWQgZWxlbWVudHNcbiAgICAgICAgbGV0IGRlcGxveWVyID0gYWNjb3VudHMuZ2V0KFwiZGVwbG95ZXJcIikhO1xuICAgICAgICBsZXQgd2FsbGV0MSA9IGFjY291bnRzLmdldChcIndhbGxldF8xXCIpITtcbiAgICAgICAgbGV0IHdhbGxldDIgPSBhY2NvdW50cy5nZXQoXCJ3YWxsZXRfMlwiKSE7XG4gICAgICAgIGNvbnN0IGNvbnRyYWN0QWRkcmVzcyA9IGRlcGxveWVyLmFkZHJlc3MgKyAnLnNidGMnO1xuICAgICAgICBjb25zdCBjb250cmFjdEFkZHJlc3NDYWxsID0gZGVwbG95ZXIuYWRkcmVzcyArICcuc2l6ZWFibGUtYml0Y29pbi1jYWxsJztcblxuICAgICAgICBsZXQgYmxvY2sxID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgICAgICAgIC8vIHByaW50IG15c2VsZiAwLjE5IFNCVEMsIGEgY2FsbCBvcHRpb24gbG9ja3MgMC4wMyBzQlRDXG5UeC5jb250cmFjdENhbGwoJ3NidGMnLCAnbWludCcsIFt0eXBlcy51aW50KDE5MDAwMDAwKSwgdHlwZXMucHJpbmNpcGFsKGRlcGxveWVyLmFkZHJlc3MpXSwgZGVwbG95ZXIuYWRkcmVzcyksXG4gICAgICAgICAgICAgICAgICAgIC8vIHByaW50IDUgc0JUQyBjYWxsIG9wdGlvbnMgc3RyaWtlIDEwMDAgU1RYIGVhY2hcblR4LmNvbnRyYWN0Q2FsbCgnc2l6ZWFibGUtYml0Y29pbi1jYWxsJywgJ21pbnQnLCBbdHlwZXMucHJpbmNpcGFsKGNvbnRyYWN0QWRkcmVzcyksIHR5cGVzLnVpbnQoMTUwMDAwMDApLCB0eXBlcy51aW50KDEwMDAwMDAwMDApXSwgZGVwbG95ZXIuYWRkcmVzcyksXG4gICAgICAgICAgICAvLyBUcmFuc2ZlciB1MSB1MyBhbmQgdTUgdG8gd2FsbGV0IDFcblR4LmNvbnRyYWN0Q2FsbCgnc2l6ZWFibGUtYml0Y29pbi1jYWxsJywgJ3RyYW5zZmVyJywgW3R5cGVzLnVpbnQoMSksIHR5cGVzLnByaW5jaXBhbChkZXBsb3llci5hZGRyZXNzKSwgdHlwZXMucHJpbmNpcGFsKHdhbGxldDEuYWRkcmVzcyldLCBkZXBsb3llci5hZGRyZXNzKSxcblR4LmNvbnRyYWN0Q2FsbCgnc2l6ZWFibGUtYml0Y29pbi1jYWxsJywgJ3RyYW5zZmVyJywgW3R5cGVzLnVpbnQoMyksIHR5cGVzLnByaW5jaXBhbChkZXBsb3llci5hZGRyZXNzKSwgdHlwZXMucHJpbmNpcGFsKHdhbGxldDEuYWRkcmVzcyldLCBkZXBsb3llci5hZGRyZXNzKSxcblR4LmNvbnRyYWN0Q2FsbCgnc2l6ZWFibGUtYml0Y29pbi1jYWxsJywgJ3RyYW5zZmVyJywgW3R5cGVzLnVpbnQoNSksIHR5cGVzLnByaW5jaXBhbChkZXBsb3llci5hZGRyZXNzKSwgdHlwZXMucHJpbmNpcGFsKHdhbGxldDEuYWRkcmVzcyldLCBkZXBsb3llci5hZGRyZXNzKVxuICAgICAgICAgICAgLy8gSWRlYTogY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCB0cmFuc2ZlcnMgYSBsaXN0IG9mIHRva2VucyBpbiAxIGdvIVxuICAgICAgICBdKTtcbiAgICAgICAgLy8gLy8gcHJpbnQgdGhlIG11bml0aW9ucyBzQlRDXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicHJpbnRpbmcgMTltIHNhdHMuLi4uLi4uLlwiLCBibG9jazEucmVjZWlwdHNbMF0uZXZlbnRzKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZXN1bHQgb2YgcHJpbnRpbmcuLi4uLi4uLlwiLCBibG9jazEucmVjZWlwdHNbMF0ucmVzdWx0KTtcbiAgICAgICAgLy8gLy8gcHJpbnQgdGhlIGNhbGxzXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicHJpbnRpbmcgNSBjYWxsIG9wdGlvbnMuLi4uLi4uLiBpcyAzIHRva2VucyBhbmQgMSBmdCBzQlRDIHRyYW5zZmVyXCIsIGJsb2NrMS5yZWNlaXB0c1sxXS5ldmVudHMpO1xuICAgICAgICAvLyB0cmFuc2ZlciB1MSB1MyBhbmQgdTUgdG8gd2FsbGV0IDFcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIxIC0gMjIyMjIyMjIyMjIyMjIuLi4uLi4uLlwiLCBibG9jazEucmVjZWlwdHNbMl0uZXZlbnRzKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIzIC0gMzMzMzMzMzMzMzMzMzMzLi4uLi4uLi5cIiwgYmxvY2sxLnJlY2VpcHRzWzNdLmV2ZW50cyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiNSAtIDQ0NDQ0NDQ0NDQ0NDQ0Li4uLi4uLi5cIiwgYmxvY2sxLnJlY2VpcHRzWzRdLmV2ZW50cyk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJwcmludCB0aGUgaGVpZ2h0Li4uXCIsIGJsb2NrMS5oZWlnaHQpO1xuICAgICAgICAvLyBhc3NlcnRFcXVhbHMoYmxvY2sxLmhlaWdodCwgMyk7XG5cbi8vICAgICAgICAgbGV0IGJsb2NrMiA9IGNoYWluLm1pbmVCbG9jayhbXG4vLyAgICAgICAgIC8vIGV4ZXJjaXNlIHU1XG4vLyBUeC5jb250cmFjdENhbGwoJ3NpemVhYmxlLWJpdGNvaW4tY2FsbCcsICdleGVyY2lzZS1hbGwtb2YtbXktZXhlcmNpc2VyLWNhbGxzJywgW3R5cGVzLnByaW5jaXBhbChjb250cmFjdEFkZHJlc3MpXSwgd2FsbGV0MS5hZGRyZXNzKVxuLy8gIC8vIHdoZXJlIGlzIHRoZSBYYnRjIGNvbnRyYWN0P1xuLy8gICAgICAgICBdKTsgXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwicHJpbnRpbmcgZXhlcmNpc2luZyB1MS4uLi4uLi4uXCIsIGJsb2NrMi5yZWNlaXB0c1swXS5ldmVudHMpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInByaW50aW5nIGV4ZXJjaXNpbmcgdTMuLi4uLi4uLlwiLCBibG9jazIucmVjZWlwdHNbMV0uZXZlbnRzKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJwcmludGluZyBleGVyY2lzaW5nIHU1Li4uLi4uLi5cIiwgYmxvY2syLnJlY2VpcHRzWzJdLmV2ZW50cyk7XG4gICAgICAgIFxuICAgICAgICAvLyBvcGVuIEFJIGlzIGluY3JlZGlibGUhIGl0IHdpbGwgYWR2YW5jZSBhbmQgYWxsb3cgbWUgdG8gbGVhcm4gc28gcXVpY2tseS4uLiBiZWluZyBlYXJseSBpcyBhIGh1Z2UgYWR2YW50YWdlIHdpdGggIG9wZW4gQUkgb24gbXkgc2lkZSBhbmQgdGhpcyBhbWF6aW5nIGNvbW11bml0eVxuICAgICAgICAvLyBsZXQncyB3b3JrLCBjb21wb3VuZCBhbmQgZGVwbG95IGNvbW1vbiBnb29kcyBmb3IgYSBiZXR0ZXIgRGVGaSB3b3JsZCBhbmQgc3F1ZWV6ZSB0aG9zZSB3YWxsIGdhcmRlbiBnYXRla2VlcGVycyBvdXQgb2YgdGhlIG1hcmtldFxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUHJpbnQgdGhlIGhlaWdodCBvZiBibG9jayAyLi4uXCIsIGJsb2NrMi5oZWlnaHQpO1xuXG4gICAgICAgIC8vIGNoYWluLm1pbmVFbXB0eUJsb2NrKDIxMDApOyAvLyBvcHRpb25zIGV4cGlyZWQgbm93IVxuICAgICAgICBsZXQgYmxvY2szID0gY2hhaW4ubWluZUJsb2NrKFtcblR4LmNvbnRyYWN0Q2FsbCgnc2l6ZWFibGUtYml0Y29pbi1jYWxsJywgJ2NvdW50ZXJwYXJ0eS1yZWNsYWltJywgW3R5cGVzLnByaW5jaXBhbChjb250cmFjdEFkZHJlc3MpLCB0eXBlcy51aW50KDEpXSwgZGVwbG95ZXIuYWRkcmVzcylcbl0pOyBcbiAgICAgICAgYmxvY2szLnJlY2VpcHRzWzBdLnJlc3VsdC5leHBlY3RFcnIoKS5leHBlY3RVaW50KDEwMTIpOyAvLyBkZXBsb3llciBjYW5ub3QgcmVjbGFpbSBpdCBhcyBpdCBkZXNuJ3QgYmVsb25nIHRvIGhpbSBhbmQgaXQncyBub3QgZXhwaXJlZFxufSxcbn0pO1xuXG5DbGFyaW5ldC50ZXN0KHtcbiAgICBuYW1lOiBcIiBUZXN0aW5nIHRoZSByZWNsYWltIHRoZW0gYWxsXCIsXG4gICAgYXN5bmMgZm4oY2hhaW46IENoYWluLCBhY2NvdW50czogTWFwPHN0cmluZywgQWNjb3VudD4pIHtcbiAgICAgICAgLy8gYXJyYW5nZTogc2V0IHVwIHRoZSBjaGFpbiwgc3RhdGUsIGFuZCBvdGhlciByZXF1aXJlZCBlbGVtZW50c1xuICAgICAgICBsZXQgZGVwbG95ZXIgPSBhY2NvdW50cy5nZXQoXCJkZXBsb3llclwiKSE7XG4gICAgICAgIGxldCB3YWxsZXQxID0gYWNjb3VudHMuZ2V0KFwid2FsbGV0XzFcIikhO1xuICAgICAgICBsZXQgd2FsbGV0MiA9IGFjY291bnRzLmdldChcIndhbGxldF8yXCIpITtcbiAgICAgICAgY29uc3QgY29udHJhY3RBZGRyZXNzID0gZGVwbG95ZXIuYWRkcmVzcyArICcuc2J0Yyc7XG4gICAgICAgIGNvbnN0IGNvbnRyYWN0QWRkcmVzc0NhbGwgPSBkZXBsb3llci5hZGRyZXNzICsgJy5zaXplYWJsZS1iaXRjb2luLWNhbGwnO1xuXG4gICAgICAgIGxldCBibG9jazEgPSBjaGFpbi5taW5lQmxvY2soW1xuICAgICAgICAgICAgLy8gcHJpbnQgbXlzZWxmIDAuMTkgU0JUQywgYSBjYWxsIG9wdGlvbiBsb2NrcyAwLjAzIHNCVENcblR4LmNvbnRyYWN0Q2FsbCgnc2J0YycsICdtaW50JywgW3R5cGVzLnVpbnQoMTkwMDAwMDApLCB0eXBlcy5wcmluY2lwYWwoZGVwbG95ZXIuYWRkcmVzcyldLCBkZXBsb3llci5hZGRyZXNzKSxcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJpbnQgNSBzQlRDIGNhbGwgb3B0aW9ucyBzdHJpa2UgMTAwMCBTVFggZWFjaFxuVHguY29udHJhY3RDYWxsKCdzaXplYWJsZS1iaXRjb2luLWNhbGwnLCAnbWludCcsIFt0eXBlcy5wcmluY2lwYWwoY29udHJhY3RBZGRyZXNzKSwgdHlwZXMudWludCgxNTAwMDAwMCksIHR5cGVzLnVpbnQoMTAwMDAwMDAwMCldLCBkZXBsb3llci5hZGRyZXNzKSxcbiAgICAgICAgICAgIC8vIFRyYW5zZmVyIHUxIHUzIGFuZCB1NSB0byB3YWxsZXQgMVxuVHguY29udHJhY3RDYWxsKCdzaXplYWJsZS1iaXRjb2luLWNhbGwnLCAndHJhbnNmZXInLCBbdHlwZXMudWludCgxKSwgdHlwZXMucHJpbmNpcGFsKGRlcGxveWVyLmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwod2FsbGV0MS5hZGRyZXNzKV0sIGRlcGxveWVyLmFkZHJlc3MpLFxuVHguY29udHJhY3RDYWxsKCdzaXplYWJsZS1iaXRjb2luLWNhbGwnLCAndHJhbnNmZXInLCBbdHlwZXMudWludCgzKSwgdHlwZXMucHJpbmNpcGFsKGRlcGxveWVyLmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwod2FsbGV0MS5hZGRyZXNzKV0sIGRlcGxveWVyLmFkZHJlc3MpLFxuVHguY29udHJhY3RDYWxsKCdzaXplYWJsZS1iaXRjb2luLWNhbGwnLCAndHJhbnNmZXInLCBbdHlwZXMudWludCg1KSwgdHlwZXMucHJpbmNpcGFsKGRlcGxveWVyLmFkZHJlc3MpLCB0eXBlcy5wcmluY2lwYWwod2FsbGV0MS5hZGRyZXNzKV0sIGRlcGxveWVyLmFkZHJlc3MpXG4gICAgICAgICAgICAvLyBJZGVhOiBjcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHRyYW5zZmVycyBhIGxpc3Qgb2YgdG9rZW5zIGluIDEgZ28hXG4gICAgICAgIF0pO1xuICAgICAgICAvLyAvLyBwcmludCB0aGUgbXVuaXRpb25zIHNCVENcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJwcmludGluZyAxOW0gc2F0cy4uLi4uLi4uXCIsIGJsb2NrMS5yZWNlaXB0c1swXS5ldmVudHMpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlc3VsdCBvZiBwcmludGluZy4uLi4uLi4uXCIsIGJsb2NrMS5yZWNlaXB0c1swXS5yZXN1bHQpO1xuICAgICAgICAvLyAvLyBwcmludCB0aGUgY2FsbHNcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJwcmludGluZyA1IGNhbGwgb3B0aW9ucy4uLi4uLi4uIGlzIDMgdG9rZW5zIGFuZCAxIGZ0IHNCVEMgdHJhbnNmZXJcIiwgYmxvY2sxLnJlY2VpcHRzWzFdLmV2ZW50cyk7XG4gICAgICAgIC8vIHRyYW5zZmVyIHUxIHUzIGFuZCB1NSB0byB3YWxsZXQgMVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIjEgLSAyMjIyMjIyMjIyMjIyMi4uLi4uLi4uXCIsIGJsb2NrMS5yZWNlaXB0c1syXS5ldmVudHMpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIjMgLSAzMzMzMzMzMzMzMzMzMzMuLi4uLi4uLlwiLCBibG9jazEucmVjZWlwdHNbM10uZXZlbnRzKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCI1IC0gNDQ0NDQ0NDQ0NDQ0NDQuLi4uLi4uLlwiLCBibG9jazEucmVjZWlwdHNbNF0uZXZlbnRzKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInByaW50IHRoZSBoZWlnaHQuLi5cIiwgYmxvY2sxLmhlaWdodCk7XG4gICAgICAgIC8vIGFzc2VydEVxdWFscyhibG9jazEuaGVpZ2h0LCAzKTtcblxuICAgICAgICBsZXQgYmxvY2syID0gY2hhaW4ubWluZUJsb2NrKFtcbiAgICAgICAgLy8gZXhlcmNpc2UgdTVcblR4LmNvbnRyYWN0Q2FsbCgnc2l6ZWFibGUtYml0Y29pbi1jYWxsJywgJ2V4ZXJjaXNlLWFsbC1vZi1teS1leGVyY2lzZXItY2FsbHMnLCBbdHlwZXMucHJpbmNpcGFsKGNvbnRyYWN0QWRkcmVzcyldLCB3YWxsZXQxLmFkZHJlc3MpXG4gLy8gd2hlcmUgaXMgdGhlIFhidGMgY29udHJhY3Q/XG4gICAgICAgIF0pOyBcbiAgICAgICAgY29uc29sZS5sb2coXCJwcmludGluZyBleGVyY2lzaW5nIHUxLi4uLi4uLi5cIiwgYmxvY2syLnJlY2VpcHRzWzBdLmV2ZW50cyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicHJpbnRpbmcgZXhlcmNpc2luZyB1My4uLi4uLi4uXCIsIGJsb2NrMi5yZWNlaXB0c1sxXS5ldmVudHMpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInByaW50aW5nIGV4ZXJjaXNpbmcgdTUuLi4uLi4uLlwiLCBibG9jazIucmVjZWlwdHNbMl0uZXZlbnRzKTtcbiAgICAgICAgXG4gICAgICAgIC8vIG9wZW4gQUkgaXMgaW5jcmVkaWJsZSEgaXQgd2lsbCBhZHZhbmNlIGFuZCBhbGxvdyBtZSB0byBsZWFybiBzbyBxdWlja2x5Li4uIGJlaW5nIGVhcmx5IGlzIGEgaHVnZSBhZHZhbnRhZ2Ugd2l0aCAgb3BlbiBBSSBvbiBteSBzaWRlIGFuZCB0aGlzIGFtYXppbmcgY29tbXVuaXR5XG4gICAgICAgIC8vIGxldCdzIHdvcmssIGNvbXBvdW5kIGFuZCBkZXBsb3kgY29tbW9uIGdvb2RzIGZvciBhIGJldHRlciBEZUZpIHdvcmxkIGFuZCBzcXVlZXplIHRob3NlIHdhbGwgZ2FyZGVuIGdhdGVrZWVwZXJzIG91dCBvZiB0aGUgbWFya2V0XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJQcmludCB0aGUgaGVpZ2h0IG9mIGJsb2NrIDIuLi5cIiwgYmxvY2syLmhlaWdodCk7XG5cbiAgICAgICAgY2hhaW4ubWluZUVtcHR5QmxvY2soNDIwMCk7IC8vIG9wdGlvbnMgZXhwaXJlZCBub3chXG5cbiAgICAgICAgbGV0IGRlcGxveWVyUmVjbGFpbSA9IGNoYWluLmNhbGxSZWFkT25seUZuKCdzaXplYWJsZS1iaXRjb2luLWNhbGwnLCAnZ2V0LXJlY2xhaW1hYmxlLWNhbGxzJywgW3R5cGVzLnByaW5jaXBhbChkZXBsb3llci5hZGRyZXNzKV0sIGRlcGxveWVyLmFkZHJlc3MpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBkZXBsb3llciByZWNsYWltYWJsZSBjYWxscy4uIFwiLCBkZXBsb3llclJlY2xhaW0pO1xuICAgICAgICAvLyB3YWxsZXQxQmFsYW5jZS5yZXN1bHQuZXhwZWN0T2soKS5leHBlY3RVaW50KDEyMzQ1Nik7IFxuXG4gICAgICAgIGxldCBibG9jazMgPSBjaGFpbi5taW5lQmxvY2soW1xuXG5UeC5jb250cmFjdENhbGwoY29udHJhY3RBZGRyZXNzQ2FsbCwgJ3JlY2xhaW1pbmcnLCBbXSwgZGVwbG95ZXIuYWRkcmVzcykgLy8gc3VjaCBhIHdhc3RlIG9mIHRpbWUsIGJ1dCBpZiBJIGRvbid0IHBhc3MgZW1wdHkgcGFyYW1zIFtdIHRoZW4gSSBnZXQgXCJlcnJvcjogVHlwZUVycm9yOiBFcnJvciBwYXJzaW5nIGFyZ3MgYXQgcG9zaXRpb24gMDogaW52YWxpZCBsZW5ndGggMCwgZXhwZWN0ZWQgc3RydWN0IFRyYW5zYWN0aW9uQXJncyB3aXRoIDQgZWxlbWVudHNcIlxuXSk7IFxuICAgIGNvbnNvbGUubG9nKFwiZGVwbG95ZXIgcmVjbGFpbXMgYWxsIGV4cGlyZWQgb3B0aW9ucy4uLi4uLi5cIiwgYmxvY2szLnJlY2VpcHRzWzBdLmV2ZW50cyk7XG4gICAgY29uc29sZS5sb2coXCJwcmludCB0aGUgaGVpZ2h0Li4uXCIsIGJsb2NrMy5oZWlnaHQpO1xuICAgIC8vICAgICAvLyBibG9jazMucmVjZWlwdHNbMF0ucmVzdWx0LmV4cGVjdEVycigpLmV4cGVjdFVpbnQoMTAwNyk7IC8vIHRva2VuIGlkIG5vdCBmb3VuZCBiZWNhdXNlIGl0IHdhcyBleGVyY2lzZWQgYW5kIGJ1cm50IHNvIGRlcGxveWVyIGNhbm5vdCByZWNsYWltIGl0XG59LFxufSk7XG5cbi8vIHdlIGhhdmUgdG8gZmlsdGVyIGl0ZW1zIG91dCBvZiByZWNsYWltYWJsZSAoZnJvbSBjb3VudGVycGFydHkpIHdoZW4gaXQgaXMgZXhlcmNpc2VkIVxuLy8gbm8gYmVjYXVzZSB3aGVuIHRva2VuIGlzIG5vdCBmb3VuZCwgXG4vLyBiZWZvcmUgdGhhdCBsZXQncyBqdXN0IHRlc3QgaXQgd2hlbiBub25lIGFyZSBleGVyY2lzZWQhXG4vLyByZXZpc2UgaWYgSSBuZWVkIGEgbGlzdCBmb3IgYWxsIGNhbGxzLCBhbmQgYSBtYXAgZm9yIGV4ZXJjaXNhYmxlIGNhbGxzIC0geWVzIEkgZG8gYmVjYXVzZSBvZiB3aGF0P1xuLy8gSSBwcm9iYWJseSBkb24ndCBzbyBJIG5lZWQgdG8gbWVyZ2UgdGhlIDI/XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsU0FBUyxRQUFRLEVBQUUsRUFBRSxFQUFrQixLQUFLLFFBQVEsOENBQThDLENBQUM7QUFFbkcsdURBQXVEO0FBRXZELHFDQUFxQztBQUNyQyx5REFBeUQ7QUFDekQsZ0JBQWdCO0FBQ2hCLGVBQWU7QUFDZiwwQkFBMEI7QUFDMUIsdUJBQXVCO0FBQ3ZCLDhDQUE4QztBQUM5QyxTQUFTO0FBQ1QsYUFBYTtBQUNiLGVBQWU7QUFDZiwwQkFBMEI7QUFDMUIsd0JBQXdCO0FBQ3hCLDJDQUEyQztBQUMzQyxTQUFTO0FBQ1QsTUFBTTtBQUNOLElBQUk7QUFFSixRQUFRLENBQUMsSUFBSSxDQUFDO0lBQ1YsSUFBSSxFQUFFLHlIQUF5SDtJQUMvSCxNQUFNLEVBQUUsRUFBQyxLQUFZLEVBQUUsUUFBOEIsRUFBRTtRQUNuRCxnRUFBZ0U7UUFDaEUsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQUFBQyxBQUFDO1FBQ3pDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEFBQUMsQUFBQztRQUN4QyxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxBQUFDLEFBQUM7UUFDeEMsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPLEFBQUM7UUFDbkQsTUFBTSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsT0FBTyxHQUFHLHdCQUF3QixBQUFDO1FBRXhFLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDekIsd0RBQXdEO1lBQ3BFLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRTtnQkFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7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