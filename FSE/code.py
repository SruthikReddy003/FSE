import sys

def find_common_values():
    list1 = next(sys.stdin).split()
    list2 = next(sys.stdin).split()

    # Convert list2 to a set for efficient lookup
    set2 = set(list2)

    # Find common values in the same order as list1
    common_values = [value for value in list1 if value in set2]

    # Separate digits and alphabets
    common_digits = [val for val in common_values if val.isdigit()]
    common_alphabets = [val for val in common_values if val.isalpha()]

    # Return the common values, or 'null' if no common values
    if common_values:
        return ' '.join(sorted(common_digits)) + ' ' + ' '.join(sorted(common_alphabets))
    else:
        return 'null'

# Call the function and print the result
print(find_common_values())