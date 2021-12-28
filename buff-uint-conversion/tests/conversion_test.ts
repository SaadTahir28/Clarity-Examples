
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.14.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that boundary conditions are working for uint to buff",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let deployer = accounts.get("deployer")!
        let block = chain.mineBlock([
            Tx.contractCall('conversion', 'uint-to-buff', [types.uint(1)], deployer.address),
            Tx.contractCall('conversion', 'uint-to-buff', [types.uint(2)], deployer.address),
            Tx.contractCall('conversion', 'uint-to-buff', [types.uint(10)], deployer.address),
            Tx.contractCall('conversion', 'uint-to-buff', [types.uint(17)], deployer.address),
            Tx.contractCall('conversion', 'uint-to-buff', [types.uint(255)], deployer.address),
            Tx.contractCall('conversion', 'uint-to-buff', [types.uint(256)], deployer.address),
            Tx.contractCall('conversion', 'uint-to-buff', [types.uint(1122)], deployer.address),
            Tx.contractCall('conversion', 'uint-to-buff', [types.uint(112233)], deployer.address),
            Tx.contractCall('conversion', 'uint-to-buff', [types.uint(11223344)], deployer.address),
            Tx.contractCall('conversion', 'uint-to-buff', [types.uint(1122334455)], deployer.address),
            Tx.contractCall('conversion', 'uint-to-buff', [types.uint(112233445566)], deployer.address),
            Tx.contractCall('conversion', 'uint-to-buff', [types.uint(11223344556677)], deployer.address),
            Tx.contractCall('conversion', 'uint-to-buff', [types.uint(1122334455667788)], deployer.address),
        ]);
        let result = block.receipts[0].result.expectOk()
        assertEquals(result, "0x01")
        result = block.receipts[1].result.expectOk()
        assertEquals(result, "0x02")
        result = block.receipts[2].result.expectOk()
        assertEquals(result, "0x0a")
        result = block.receipts[3].result.expectOk()
        assertEquals(result, "0x11")
        result = block.receipts[4].result.expectOk()
        assertEquals(result, "0xff")
        result = block.receipts[5].result.expectOk()
        assertEquals(result, "0x0100")
        result = block.receipts[6].result.expectOk()
        assertEquals(result, "0x0462")
        result = block.receipts[7].result.expectOk()
        assertEquals(result, "0x01b669")
        result = block.receipts[8].result.expectOk()
        assertEquals(result, "0xab4130")
        result = block.receipts[9].result.expectOk()
        assertEquals(result, "0x42e576f7")
        result = block.receipts[10].result.expectOk()
        assertEquals(result, "0x1a21a278be")
        result = block.receipts[11].result.expectOk()
        assertEquals(result, "0x0a3523772a85")
        result = block.receipts[12].result.expectOk()
        assertEquals(result, "0x03fcc1da8c9c4c")
    },
});

Clarinet.test({
    name: "Ensure that boundary conditions are working for buff to uint",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let deployer = accounts.get("deployer")!

        let block = chain.mineBlock([
            Tx.contractCall('conversion', 'buff-to-uint', [types.buff(new Uint8Array([0x01]).buffer)], deployer.address),
            Tx.contractCall('conversion', 'buff-to-uint', [types.buff(new Uint8Array([0x02]).buffer)], deployer.address),
            Tx.contractCall('conversion', 'buff-to-uint', [types.buff(new Uint8Array([0x0a]).buffer)], deployer.address),
            Tx.contractCall('conversion', 'buff-to-uint', [types.buff(new Uint8Array([0x11]).buffer)], deployer.address),
            Tx.contractCall('conversion', 'buff-to-uint', [types.buff(new Uint8Array([0xff]).buffer)], deployer.address),
            Tx.contractCall('conversion', 'buff-to-uint', [types.buff(new Uint8Array([0x01,0x00]).buffer)], deployer.address),
            Tx.contractCall('conversion', 'buff-to-uint', [types.buff(new Uint8Array([0x04,0x62]).buffer)], deployer.address),
            Tx.contractCall('conversion', 'buff-to-uint', [types.buff(new Uint8Array([0x01,0xb6,0x69]).buffer)], deployer.address),
            Tx.contractCall('conversion', 'buff-to-uint', [types.buff(new Uint8Array([0xab,0x41,0x30]).buffer)], deployer.address),
            Tx.contractCall('conversion', 'buff-to-uint', [types.buff(new Uint8Array([0x42,0xe5,0x76,0xf7]).buffer)], deployer.address),
            Tx.contractCall('conversion', 'buff-to-uint', [types.buff(new Uint8Array([0x1a,0x21,0xa2,0x78,0xbe]).buffer)], deployer.address),
            Tx.contractCall('conversion', 'buff-to-uint', [types.buff(new Uint8Array([0x0a,0x35,0x23,0x77,0x2a,0x85]).buffer)], deployer.address),
            Tx.contractCall('conversion', 'buff-to-uint', [types.buff(new Uint8Array([0x03,0xfc,0xc1,0xda,0x8c,0x9c,0x4c]).buffer)], deployer.address),
        ]);
        block.receipts[0].result.expectUint(1)
        block.receipts[1].result.expectUint(2)
        block.receipts[2].result.expectUint(10)
        block.receipts[3].result.expectUint(17)
        block.receipts[4].result.expectUint(255)
        block.receipts[5].result.expectUint(256)
        block.receipts[6].result.expectUint(1122)
        block.receipts[7].result.expectUint(112233)
        block.receipts[8].result.expectUint(11223344)
        block.receipts[9].result.expectUint(1122334455)
        block.receipts[10].result.expectUint(112233445566)
        block.receipts[11].result.expectUint(11223344556677)
        block.receipts[12].result.expectUint(1122334455667788)
    },
});