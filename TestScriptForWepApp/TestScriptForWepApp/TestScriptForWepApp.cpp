// TestScriptForWepApp.cpp: определяет точку входа для консольного приложения.
//

#include "stdafx.h"
#include <iostream>
#include <windows.h>

using namespace std;

int main(int argc, char* argv[])
{
	SetConsoleCP(1251);
	SetConsoleOutputCP(1251);
	//setlocale(LC_ALL, "Russian");
	if (argc > 1)// если передаем аргументы, то argc будет больше 1(в зависимости от кол-ва аргументов)
	{
		int length = 0;
		cout << "The program is running\n Enter parametrs: " << argv[1] << "\n";
		length = atoi(argv[1]);

		if (length > 0) {
			for (int i = 1; i < length + 1; i++) {
				cout << i * i << "\n";
			}
		}

		cout << "The program is finished\n";
	}
	else
	{
		cout << "Not arguments" << endl;
	}

	// для паузы
	//system("pause");

	return 0;
}