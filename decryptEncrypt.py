import base64

# Secret key must match the Java version
SECRET = "amazing"
SECRET_LENGTH = len(SECRET)

def xor_operate(input_text):
    """Performs XOR encryption/decryption."""
    result = []
    for i in range(len(input_text)):
        xor_val = ord(input_text[i]) ^ ord(SECRET[i % SECRET_LENGTH])
        result.append(chr(xor_val))
    return ''.join(result)

def encrypt(text):
    """Encrypts text using XOR and Base64 encoding."""
    xor_result = xor_operate(text)
    base64_encoded = base64.b64encode(xor_result.encode()).decode()
    return base64_encoded

def decrypt(base64_text):
    """Decrypts Base64-encoded XOR encrypted text."""
    decoded_bytes = base64.b64decode(base64_text)
    decoded_text = decoded_bytes.decode()
    decrypted_text = xor_operate(decoded_text)
    return decrypted_text

if __name__ == "__main__":
    while True:
        print("\n==== Damn Vulnerable Bank XOR Encryptor/Decryptor ====")
        print("1. Encrypt text")
        print("2. Decrypt text")
        print("3. Exit")
        choice = input("Enter choice (1/2/3): ")

        if choice == "1":
            plaintext = input("Enter text to encrypt: ")
            encrypted = encrypt(plaintext)
            print("\nEncrypted text:\n", encrypted)

        elif choice == "2":
            encrypted_text = input("Enter Base64-encoded text to decrypt: ")
            decrypted = decrypt(encrypted_text)
            print("\nDecrypted text:\n", decrypted)

        elif choice == "3":
            print("Exiting... Goodbye!")
            break  # Exits the loop

        else:
            print("Invalid choice. Please enter 1, 2, or 3.")
