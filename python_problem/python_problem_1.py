num = 0

def get_valid_input():
    while True:
        try:
            count = int(input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능):"))
            if count not in [1,2,3]:
                print("1,2,3 중 하나만 입력하세요")
            
            else:
                return count
        except ValueError:
            print("정수를 입력하세요")

def play_turn(player):
    global num
    count = get_valid_input()
    for i in range(count):
        num +=1
        print(f"{player}:{num}")

play_turn("playerA")
play_turn("playerB")