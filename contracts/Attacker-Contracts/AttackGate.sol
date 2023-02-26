
object "AttackGate" {
    
    code {
        // Deploy the contract
        datacopy(0, dataoffset("runtime"), datasize("runtime"))
        return(0, datasize("runtime"))
    }
    object "runtime" {
        code {
            
            //load 32 bytes calldata and shift right 224 bytes
            // let s := shr(0xe0, calldataload(0)) // 0x0000000000000000000000000000000000000000000000000000000000000000
            
            switch selector()

            // 0x00000000
            case 0 { /* "f00000000_bvvvdlt()" */
                mstore(0,caller())
                return(0x00, 0x20)   
            }
            
            // 0x00000001
            case 1 { /* "f00000001_grffjzz()" */
                mstore(0,origin())
                return(0x00, 0x20)
            }

            default{
                revert(0,0)
            }

            function selector() -> s {
				s := shr(0xe0, calldataload(0x00))
			}
        }
    }
}


