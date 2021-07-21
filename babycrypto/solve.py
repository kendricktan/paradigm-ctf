# https://billatnapier.medium.com/ecdsa-weakness-where-nonces-are-reused-2be63856a01a

from ecdsa import ecdsa
import sha3
import binascii


def hash_message(msg: str) -> int:
    """
    hash the message using keccak256, truncate if necessary
    """
    k = sha3.keccak_256()
    k.update(msg.encode("utf8"))
    d = k.digest()
    n = int(binascii.hexlify(d), 16)
    olen = ecdsa.generator_secp256k1.order().bit_length() or 1
    dlen = len(d)
    n >>= max(0, dlen - olen)
    return n


def gen_session_secret() -> int:
    """
    generate a random 32 byte session secret
    """
    with open("/dev/urandom", "rb") as rnd:
        seed1 = int(binascii.hexlify(rnd.read(32)), 16)
        seed2 = int(binascii.hexlify(rnd.read(32)), 16)
    return seed1 ^ seed2


g = ecdsa.generator_secp256k1

m1 = 'a'
m2 = 'b'

h1 = hash_message(m1)
h2 = hash_message(m2)

r = 0x29b227f79e0ea5acb4d695fc9f04a026373857e154c261f61d64fbfa5783bbf2

s1 = 0x1f20ed1b8d7a28e13a97080b245c9af3071767eaafe750085f6658e5cb59c0df
s2 = 0xf1996f2baefc4d4f627a57c602bd4832a47d21f481dbf20a0c405a01fcbc2596

# Reconstruct private key
valinv = ecdsa.numbertheory.inverse_mod(r * (s1 - s2), g.order())
x1rec = ((s2 * h1 - s1 * h2) * (valinv)) % g.order()

pub = ecdsa.Public_key(g, g * x1rec)
priv = ecdsa.Private_key(pub, x1rec)

# Reconstruct nonce
valinv = ecdsa.numbertheory.inverse_mod((s1-s2), g.order())
k1rec = ((h1-h2) * valinv) % g.order()

test = 0x360b1626a45ea7862d6772b12df995667a7109d3e44794d332be9573ba152528

sig = priv.sign(
    0x360b1626a45ea7862d6772b12df995667a7109d3e44794d332be9573ba152528, k1rec)
print(f"r=0x{sig.r:032x}")
print(f"s=0x{sig.s:032x}")
