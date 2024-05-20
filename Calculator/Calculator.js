document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.number, .operator, #clearLast, #clearAll, #equal');

    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'AC') {
                // Clear All: Reset calculator
                currentInput = '';
                operator = '';
                previousInput = '';
                display.textContent = '0';
                return;
            }

            if (value === 'C') {
                // Clear Last: Remove last entered digit
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || '0';
                return;
            }

            // Handle remaining buttons
            if (value === '=') {
                // Evaluate expression
                if (currentInput && previousInput && operator) {
                    const result = calculate(previousInput, currentInput, operator);
                    display.textContent = result;
                    previousInput = result;
                    currentInput = '';
                    operator = '';
                }
                return;
            }

            // Handle number and operator buttons
            if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    previousInput = currentInput;
                    currentInput = '';
                    operator = value;
                }
                return;
            }

            // Append digits to current input
            currentInput += value;
            display.textContent = currentInput;
        });
    });

    // Function to perform calculation
    function calculate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);

        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return 0;
        }
    }
});
