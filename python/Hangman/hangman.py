# Hangman Game (Jogo da Forca)
# Programação Orientada a Objetos

# Import
import random

word_list = list()
# Board (tabuleiro)
board = ['''

>>>>>>>>>>Hangman<<<<<<<<<<

+---+
|   |
    |
    |
    |
    |
=========''', '''

+---+
|   |
O   |
    |
    |
    |
=========''', '''

+---+
|   |
O   |
|   |
    |
    |
=========''', '''

 +---+
 |   |
 O   |
/|   |
     |
     |
=========''', '''

 +---+
 |   |
 O   |
/|\  |
     |
     |
=========''', '''

 +---+
 |   |
 O   |
/|\  |
/    |
     |
=========''', '''

 +---+
 |   |
 O   |
/|\  |
/ \  |
     |
=========''']


# Classe
class Hangman:
	# Método Construtor
	def __init__(self, word):
		self.word = word

	# Método para adivinhar a letra
	def guess(self, letter):
		return letter in self.word
		
	# Método para verificar se o jogo terminou
	def hangman_over(self):
		return word_list.count('_') > 0
		
	# Método para verificar se o jogador venceu
	def hangman_won(self):
		return word_list.count('_') == 0

	# Método para não mostrar a letra no board
	def hide_word(self, len_word):
		i = 0
		while i < len_word:
			word_list.insert(i, '_')
			i += 1

	# Metodo para preencher as letras existentes na palavra
	def show_letter(self, letter):
		i = 0
		for letters in self.word:
			if letters == letter:
				word_list[i] = letter
			i += 1

	# Método para checar o status do game e imprimir o board na tela
	def print_game_status(self, numJogadas):
		print(board[numJogadas])
		print('* Dica: é um animal')
		print()
		print('A palavra é:', end="")
		for letter in word_list:
			print('', letter, '', end="")


# Função para ler uma palavra de forma aleatória do banco de palavras
def rand_word():
	with open("palavras_pt.txt", "rt") as f:
		bank = f.readlines()
		return bank[random.randint(0, len(bank))].strip()


# Função Main - Execução do Programa
def main():
	numJogadas = 0
	letter = ''
	# Objeto
	game = Hangman(rand_word())
	game.hide_word(len(game.word))
	game.print_game_status(numJogadas)
	while numJogadas <= 6:
		print()
		letter = input('Informe uma letra: ')
		if game.guess(letter):
			game.show_letter(letter)
		else:
			numJogadas += 1

		print('Jogadas restantes:', 6 - numJogadas)
		game.print_game_status(numJogadas)
		if game.hangman_won():
			print('\nParabéns! Você venceu!!')
			break
		elif numJogadas == 6 and game.hangman_over():
			print('\nGame over! Você perdeu.')
			print('A palavra era ' + game.word)
			break

	print ('\nFoi bom jogar com você! Agora vá estudar!\n')


# Executa o programa		
if __name__ == "__main__":
	main()
