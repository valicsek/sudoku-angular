import { computed, inject } from '@angular/core';
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import { SudokuService } from '../../services/sudoku.service';
import { EDifficulty } from '../../shared/enums/shared.enums';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';

type SudokuState = {
    board: number[][];
    boardSolution: number[][];
    nuOfMistakes: number;
    isLoading: boolean;
};

const initialState: SudokuState = {
    board: Array.from({ length: 9 }, () => Array(9).fill(0)),
    boardSolution: Array.from({ length: 9 }, () => Array(9).fill(0)),
    nuOfMistakes: 0,
    isLoading: false,
};

export const SudokuStore = signalStore(
    withState(initialState),
    withComputed(({ board, isLoading, boardSolution, nuOfMistakes }) => ({
        board: computed(() => board()),
        isLoading: computed(() => isLoading()),
        boardSolution: computed(() => boardSolution()),
        nuOfMistakes: computed(() => nuOfMistakes()),
    })),
    withMethods((store, sudokuService = inject(SudokuService)) => ({
        setBoard(board: number[][]): void {
            patchState(store, { board: board });
        },
        incrementMistakes() {
            patchState(store, { nuOfMistakes: store.nuOfMistakes() + 1 });
        },
        resetMistakes() {
            patchState(store, { nuOfMistakes: 0 });
        },
        setBoardByRowColumn(row: number, column: number, value: number): void {
            const board = store.board();
            board[row][column] = value;
            patchState(store, { board });
        },
        validateBoard: rxMethod<void>(
            pipe(
                switchMap(() => sudokuService.validateBoard(store.board())),
                tapResponse({
                    next: (response) => console.log(response),
                    error: (error) => console.error(error)
                })
            )
        ),
        solveBoard: rxMethod<void>(
            pipe(
                switchMap(() => {
                    patchState(store, { isLoading: true });
                    return sudokuService.solveBoard(store.board());
                }),
                tapResponse({
                    next: (response) => patchState(store, { board: response.solution }),
                    error: (error) => console.error(error),
                    finalize: () => patchState(store, { isLoading: false })
                })
            )
        ),
        generateBoard: rxMethod<EDifficulty>(
            pipe(
                switchMap((difficulty: EDifficulty) => {
                    patchState(store, { isLoading: true });
                    return sudokuService.generateBoard(difficulty).pipe(
                        tapResponse({
                            next: (response) => patchState(store, { board: response.board }),
                            error: console.error,
                            finalize: () => patchState(store, { isLoading: false }),
                        }),
                        switchMap(() => sudokuService.solveBoard(store.board())),
                        tapResponse({
                            next: (response) => patchState(store, { boardSolution: response.solution }),
                            error: console.error,
                            finalize: () => patchState(store, { isLoading: false }),
                        })
                    );
                })
            )
        ),
        getBoardSolution: rxMethod<void>(
            pipe(
                switchMap(() => sudokuService.solveBoard(store.board())),
                tapResponse({
                    next: (response) => patchState(store, { boardSolution: response.solution }),
                    error: console.error,
                    finalize: () => patchState(store, { isLoading: false }),
                })
            )
        )
    })))
