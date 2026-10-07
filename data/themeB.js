/* Theme B SL questions (Paper 2). alg = algorithmic-thinking question (no code needed). Language variants via PJ()/C({py,java}). */
const SQB=[
// ================= Algorithmic thinking (no code) =================
{id:"B-alg-digits",fam:"B1",alg:1,title:"Digits and queues",stem:"Algorithms can be represented by flowcharts. Consider the flowchart below."+FLOW("Figure 1: Flowchart for an algorithm",[
 {id:"s",k:"t",x:"START",next:"in"},{id:"in",k:"io",x:"input N",next:"i"},{id:"i",k:"p",x:"count = 0|total = 0",next:"d"},
 {id:"d",k:"d",x:"N > 0 ?",yes:"dg",no:"o"},{id:"dg",k:"p",x:"digit = N mod 10",next:"t"},{id:"t",k:"p",x:"total = total + digit",next:"n"},
 {id:"n",k:"p",x:"N = N div 10",next:"c"},{id:"c",k:"p",x:"count = count + 1",next:"d"},{id:"o",k:"io",x:"output count, total",next:"e"},{id:"e",k:"t",x:"END"}]),
parts:[
 {st:"B1.1",r:"B1.1.2",q:"Identify the computational thinking concept used when a large problem is broken down into smaller, more manageable sub-problems.",m:1,ms:["Decomposition"]},
 {st:"B1.1",r:"B1.1.4",q:"Copy and complete a trace table for the flowchart in Figure 1 when the input N is 4072. Use the columns N, N &gt; 0 ?, digit, total, count and output. (<i>mod</i> gives the remainder; <i>div</i> gives the whole-number result of division.)",m:4,ms:["N: 4072, 407, 40, 4, 0","digit: 2, 7, 0, 4","total: 2, 9, 9, 13 and count: 1, 2, 3, 4","output: 4, 13 (and N &gt; 0 ? false at the end)"],note:"Award [1] per correct column group as listed."},
 {st:"B1.1",r:"B1.1.4",q:"State the purpose of the algorithm in Figure 1.",m:1,ms:["It counts the number of digits in N and calculates the sum of the digits"]},
 {pre:`Table 1 shows the fundamental operations of a queue.${T([["Operation","Description"],["enqueue(x)","Adds x to the back of the queue."],["dequeue()","Removes and returns the element at the front of the queue."],["front()","Returns the element at the front without removing it."],["isEmpty()","Returns true if the queue is empty, otherwise false."]])}`,st:"B2.2",r:"B2.2.4",q:"An empty queue Q is used. Sketch the queue after these operations, clearly indicating the front:<br><code class='i'>enqueue(4) enqueue(9) enqueue(2) dequeue() enqueue(7) front() enqueue(5) dequeue()</code>",m:2,ms:["Elements 2, 7, 5 (in that order)","front clearly shown at 2"]},
 {st:"B2.2",r:"B2.2.3",q:"A stack S, with operations push, pop, peek and isEmpty, is available. Without writing code, describe how the order of the elements in queue Q could be reversed using S.",m:4,ms:["While Q is not empty (isEmpty is false)","dequeue an element from Q and push it onto S","then while S is not empty","pop an element from S and enqueue it onto Q"],note:"Answer must show an algorithmic approach."},
 {st:"B2.2",r:"B2.2.4",q:"Outline one real-world situation in which a queue is an appropriate data structure.",m:2,ms:["Print jobs sent to a shared printer","are printed in the order they arrive (FIFO)","(accept: keyboard buffer, CPU process scheduling, customer service calls, packets in a router)"]},
 {st:"B1.1",r:"B1.1.1",q:"A school wants a system to manage the queue of print jobs sent to its library printer. Identify two items that should be included in the problem specification.",m:2,ms:["Problem statement","constraints/limitations (e.g. maximum file size)","objectives/goals","input specification (e.g. document, user ID)","output specification (e.g. printed pages, status messages)","evaluation criteria"]}
]},
{id:"B-alg-search",fam:"B2",alg:1,title:"Searching and sorting",stem:"A music app stores the IDs of a user's favourite songs. The IDs are stored in order in a list called IDS:<br><code class='i'>[3, 8, 15, 21, 27, 38, 44, 52, 60]</code> (indices 0 to 8).",parts:[
 {st:"B2.4",r:"B2.4.2",q:"Copy and complete a trace table to show how a binary search finds the value 38. Use the columns low, high, mid, IDS[mid]. (mid is calculated as (low + high) div 2.)",m:3,ms:["low/high/mid: 0, 8, 4 → IDS[4] = 27","5, 8, 6 → IDS[6] = 44","5, 5, 5 → IDS[5] = 38 found"],note:"Award [1] per correct row."},
 {st:"B2.4",r:"B2.4.1",q:"State the Big O time complexity of a linear search and of a binary search.",m:2,ms:["Linear search: O(n)","Binary search: O(log n)"]},
 {st:"B2.4",r:"B2.4.2",q:"Outline why a binary search cannot be used to find a song by its title in this list.",m:2,ms:["Binary search requires the data to be sorted by the value being searched for","the list is sorted by ID, not by title, so a linear search would be needed"]},
 {st:"B2.4",r:"B2.4.3",q:"Without writing code, describe the steps of a bubble sort that sorts a list into ascending order.",m:4,ms:["Compare each pair of adjacent elements, starting from the beginning","if they are in the wrong order (first larger than second), swap them","repeat for every pair to the end of the list — this is one pass; the largest value is now at the end","repeat passes until a pass makes no swaps/n − 1 passes (each pass can ignore the last sorted element)"]},
 {st:"B2.4",r:"B2.4.3",q:"State the contents of the list <code class='i'>[5, 1, 4, 2, 8]</code> after the first pass of a bubble sort into ascending order.",m:2,ms:["[1, 4, 2, 5, 8]"],note:"[2] for fully correct; [1] if one element misplaced."},
 {st:"B2.4",r:"B2.4.3",q:"Explain one advantage of selection sort compared with bubble sort.",m:2,ms:["Selection sort makes at most one swap per pass (n − 1 swaps in total)","so it is more efficient when swapping/writing data is expensive","(bubble sort can stop early if the list is already sorted — accept as a comparison only if linked to selection sort's advantage)"]}
]},
{id:"B-alg-files",fam:"B1",alg:1,title:"Nested loops and files",stem:"Consider the flowchart below."+FLOW("Figure 2: Flowchart for an algorithm",[
 {id:"s",k:"t",x:"START",next:"i"},{id:"i",k:"p",x:"i = 1",next:"d1"},{id:"d1",k:"d",x:"i <= 3 ?",yes:"j",no:"e"},
 {id:"j",k:"p",x:"j = 1",next:"d2"},{id:"d2",k:"d",x:"j <= i ?",yes:"o",no:"ii"},{id:"o",k:"io",x:"output i * j",next:"jj"},
 {id:"jj",k:"p",x:"j = j + 1",next:"d2"},{id:"ii",k:"p",x:"i = i + 1",next:"d1"},{id:"e",k:"t",x:"END"}]),
parts:[
 {st:"B1.1",r:"B1.1.4",q:"State all the outputs produced by the flowchart in Figure 2, in order.",m:3,ms:["1","2, 4","3, 6, 9"],note:"Award [1] for each correct group in the correct order."},
 {st:"B2.4",r:"B2.4.1",q:"The value 3 in step 3 is replaced by a variable n. State the Big O time complexity of the algorithm in terms of n.",m:1,ms:["O(n²)"]},
 {pre:"The text file <b>scores</b> stores the name of each student on one line, followed by their test score on the next line:<pre class='code'>Amira\n72\nBen\n45\nChen\n90\n…</pre>An algorithm reads <b>scores</b> line by line and writes the names of students who scored 50 or more into a new file, <b>passed</b>. Both files are currently closed.",st:"B2.5",r:"B2.5.1",q:"Describe the steps that would be followed by this algorithm.",m:5,ms:["Open scores for reading","open passed for writing","loop until the end of the scores file","read a name line, then read the next line as the score (convert to a number)","if the score ≥ 50, write the name to passed","close both files"],note:"Award [1] for each step, max [5]. Award [1] for the first two steps if files are opened without stating the modes."},
 {st:"B1.1",r:"B1.1.2",q:"Outline how abstraction is used when designing this algorithm.",m:2,ms:["Only the details needed for the problem are kept (name and score)","other details about the students (e.g. address, class) are ignored, simplifying the solution"]},
 {st:"B2.1",r:"B2.1.4",q:"Outline how breakpoint debugging could help a programmer find an error in the code for this algorithm.",m:2,ms:["The program pauses at a chosen line (breakpoint)","so the values of variables (e.g. name, score) can be inspected at that point/stepped through line by line to find where they go wrong"]},
 {st:"B1.1",r:"B1.1.2",q:"Outline what is meant by pattern recognition in computational thinking.",m:2,ms:["Identifying similarities/repeated features in problems or data","so an existing solution/approach can be reused (e.g. reading name/score pairs repeatedly)"]}
]},
// ================= Programming fundamentals / data structures =================
{id:"B-temps",fam:"B2",title:"Weekly temperatures",stem:[PJ("A weather app stores the midday temperatures (°C) for one week in a list called <code class='i'>temps</code>:","A weather app stores the midday temperatures (°C) for one week in an array called <code class='i'>temps</code>:"),C({py:`temps = [21.5, 23.0, 19.5, 25.0, 22.5, 18.0, 24.5]`,java:`double[] temps = {21.5, 23.0, 19.5, 25.0, 22.5, 18.0, 24.5};`})],parts:[
 {st:"B2.1",r:"B2.1.1",q:"State the most appropriate data type for one temperature.",m:1,ms:[PJ("float (decimal)","double (decimal)")]},
 {st:"B2.3",r:"B2.3.3",q:"State the output of the following code.",m:2,ms:["3","(the values 23.0, 25.0, 24.5 are greater than 22.5 — [1] for method/partial)"],pre:C({py:`
count = 0
for t in temps:
    if t > 22.5:
        count = count + 1
print(count)`,java:`
int count = 0;
for (int i = 0; i < temps.length; i++) {
    if (temps[i] > 22.5) {
        count = count + 1;
    }
}
System.out.println(count);`})},
 {st:"B2.3",r:"B2.3.4",q:PJ("Construct the function <code class='i'>average(temps)</code> that returns the mean of the values in the list. The <code class='i'>sum()</code> function must not be used.","Construct the method <code class='i'>average(double[] temps)</code> that returns the mean of the values in the array."),m:3,ms:["Initialise a total to 0","loop through every element adding it to the total","return total divided by the number of elements (len/length)"],ans:C({py:`
def average(temps):
    total = 0
    for t in temps:
        total = total + t
    return total / len(temps)`,java:`
public static double average(double[] temps) {
    double total = 0;
    for (int i = 0; i < temps.length; i++) {
        total = total + temps[i];
    }
    return total / temps.length;
}`})},
 {st:"B2.4",r:"B2.4.2",q:PJ("Construct the function <code class='i'>hottest_day(temps)</code> that returns the index of the highest temperature. The <code class='i'>max()</code> function must not be used.","Construct the method <code class='i'>hottestDay(double[] temps)</code> that returns the index of the highest temperature."),m:4,ms:["Initialise the index of the highest to 0 (first element)","loop through the remaining elements","compare each element with the current highest and update the index when larger","return the index"],ans:C({py:`
def hottest_day(temps):
    best = 0
    for i in range(1, len(temps)):
        if temps[i] > temps[best]:
            best = i
    return best`,java:`
public static int hottestDay(double[] temps) {
    int best = 0;
    for (int i = 1; i < temps.length; i++) {
        if (temps[i] > temps[best]) {
            best = i;
        }
    }
    return best;
}`})},
 {st:"B2.2",r:"B2.2.1",q:PJ("The app will store a year of readings, but the number of readings is not known in advance. Compare a static data structure with a dynamic data structure (such as a Python list) for this purpose.","The app will store a year of readings, but the number of readings is not known in advance. Compare a static array with a dynamic ArrayList for this purpose."),m:3,ms:["A static structure has a fixed size set when it is created; a dynamic structure can grow/shrink at run time","a static structure may waste memory if too large or run out of space if too small","a dynamic structure uses memory only as needed but has overheads (resizing/pointers) and access can be slower","static allows fast, direct indexed access with predictable memory use"],note:"Award up to [3] for valid comparison points."},
 {st:"B2.1",r:"B2.1.3",q:PJ("Users type in a temperature, which is converted with <code class='i'>float(input())</code>. Explain how exception handling could prevent the program crashing if a user types <code class='i'>hot</code>.","Users type in a temperature, which is converted with <code class='i'>Double.parseDouble(input)</code>. Explain how exception handling could prevent the program crashing if a user types <code class='i'>hot</code>."),m:3,ms:[PJ("Place the conversion inside a try block","Place the conversion inside a try block"),PJ("a ValueError is raised and caught by an except block","a NumberFormatException is thrown and caught by a catch block"),"the except/catch block displays an error message and asks the user to try again instead of crashing","(a finally block can run clean-up code whether or not an error occurred)"]}
]},
{id:"B-strings",fam:"B2",title:"Usernames and passwords",stem:"A school creates usernames and checks passwords for its students.",parts:[
 {st:"B2.1",r:"B2.1.2",q:"State the output of the following code.",pre:C({py:`
name = "Gonzalez"
print(name[0:3])
print(name[-2:])
print(name.upper()[2])`,java:`
String name = "Gonzalez";
System.out.println(name.substring(0, 3));
System.out.println(name.substring(name.length() - 2));
System.out.println(name.toUpperCase().charAt(2));`}),m:3,ms:["Gon","ez","N"]},
 {st:"B2.1",r:"B2.1.2",q:PJ("A username is made from the first three letters of the surname in lower case, the first letter of the first name in lower case, and the last two digits of the year the student joined. For example, Maria Gonzalez who joined in 2024 has the username <code class='i'>gonm24</code>. Construct the function <code class='i'>make_username(first, last, year)</code>, where <code class='i'>year</code> is an integer, that returns the username.","A username is made from the first three letters of the surname in lower case, the first letter of the first name in lower case, and the last two digits of the year the student joined. For example, Maria Gonzalez who joined in 2024 has the username <code class='i'>gonm24</code>. Construct the method <code class='i'>makeUsername(String first, String last, int year)</code> that returns the username."),m:4,ms:["Extract the first three characters of the surname","extract the first character of the first name","convert both to lower case","obtain the last two digits of the year (e.g. year mod 100, padded, or string slice) and concatenate/return the result"],ans:C({py:`
def make_username(first, last, year):
    part1 = last[0:3].lower()
    part2 = first[0].lower()
    part3 = str(year)[-2:]
    return part1 + part2 + part3`,java:`
public static String makeUsername(String first, String last, int year) {
    String part1 = last.substring(0, 3).toLowerCase();
    String part2 = first.substring(0, 1).toLowerCase();
    String y = String.valueOf(year);
    String part3 = y.substring(y.length() - 2);
    return part1 + part2 + part3;
}`})},
 {st:"B2.3",r:"B2.3.2",q:PJ("A valid password has at least 8 characters and contains at least one digit and at least one upper-case letter. Construct the function <code class='i'>is_valid(password)</code> that returns <code class='i'>True</code> if the password is valid and <code class='i'>False</code> otherwise.","A valid password has at least 8 characters and contains at least one digit and at least one upper-case letter. Construct the method <code class='i'>isValid(String password)</code> that returns <code class='i'>true</code> if the password is valid and <code class='i'>false</code> otherwise."),m:5,ms:["Check the length is at least 8","loop through each character of the password","check whether the character is a digit and record it (flag)","check whether the character is upper case and record it (flag)","return true only if the length and both flags are satisfied"],ans:C({py:`
def is_valid(password):
    if len(password) < 8:
        return False
    has_digit = False
    has_upper = False
    for ch in password:
        if ch.isdigit():
            has_digit = True
        elif ch.isupper():
            has_upper = True
    return has_digit and has_upper`,java:`
public static boolean isValid(String password) {
    if (password.length() < 8) {
        return false;
    }
    boolean hasDigit = false;
    boolean hasUpper = false;
    for (int i = 0; i < password.length(); i++) {
        char ch = password.charAt(i);
        if (Character.isDigit(ch)) {
            hasDigit = true;
        } else if (Character.isUpperCase(ch)) {
            hasUpper = true;
        }
    }
    return hasDigit && hasUpper;
}`})},
 {st:"B2.3",r:"B2.3.4",q:"Distinguish between a local variable and a global variable.",m:2,ms:["A local variable is declared inside a function/method and can only be used there (exists only while it runs)","a global variable is declared outside all functions/methods and can be accessed throughout the program"]},
 {st:"B2.3",r:"B2.3.4",q:"Outline one benefit of writing the username and password checks as separate functions (modularization).",m:2,ms:["Each function can be tested/debugged independently","and reused in other parts of the program/by other programmers, making code easier to maintain"]}
]},
{id:"B-rain",fam:"B2",title:"Rainfall records",stem:[PJ("A weather station records daily rainfall (mm) for 4 weeks in a 2D list called <code class='i'>rain</code>. Each row is a week and each column is a day (0 = Monday).","A weather station records daily rainfall (mm) for 4 weeks in a 2D array called <code class='i'>rain</code>. Each row is a week and each column is a day (0 = Monday)."),C({py:`
rain = [[0, 2, 5, 0, 0, 1, 3],
        [4, 0, 0, 0, 7, 2, 0],
        [0, 0, 1, 6, 0, 0, 0],
        [2, 9, 0, 0, 3, 0, 1]]`,java:`
int[][] rain = {{0, 2, 5, 0, 0, 1, 3},
                {4, 0, 0, 0, 7, 2, 0},
                {0, 0, 1, 6, 0, 0, 0},
                {2, 9, 0, 0, 3, 0, 1}};`})],parts:[
 {st:"B2.2",r:"B2.2.2",q:"State the code that accesses the rainfall for Thursday (day 3) of the second week.",m:1,ms:["rain[1][3]"]},
 {st:"B2.3",r:"B2.3.3",q:"State the output of the following code.",pre:C({py:`
dry = 0
for w in range(4):
    for d in range(7):
        if rain[w][d] == 0:
            dry = dry + 1
print(dry)`,java:`
int dry = 0;
for (int w = 0; w < 4; w++) {
    for (int d = 0; d < 7; d++) {
        if (rain[w][d] == 0) {
            dry = dry + 1;
        }
    }
}
System.out.println(dry);`}),m:2,ms:["15"],note:"[2] for 15; [1] for 14 or 16 (counting error)."},
 {st:"B2.2",r:"B2.2.2",q:PJ("Construct the function <code class='i'>week_totals(rain)</code> that outputs the total rainfall for each week, one line per week.","Construct the method <code class='i'>weekTotals(int[][] rain)</code> that outputs the total rainfall for each week, one line per week."),m:4,ms:["Outer loop through each week (row)","reset the total to 0 for each week","inner loop adding each day's value to the total","output the total after the inner loop (inside the outer loop)"],ans:C({py:`
def week_totals(rain):
    for w in range(len(rain)):
        total = 0
        for d in range(len(rain[w])):
            total = total + rain[w][d]
        print("Week", w + 1, ":", total)`,java:`
public static void weekTotals(int[][] rain) {
    for (int w = 0; w < rain.length; w++) {
        int total = 0;
        for (int d = 0; d < rain[w].length; d++) {
            total = total + rain[w][d];
        }
        System.out.println("Week " + (w + 1) + ": " + total);
    }
}`})},
 {st:"B2.2",r:"B2.2.2",q:PJ("Construct the function <code class='i'>wettest_day(rain)</code> that outputs the week number and day number of the day with the highest rainfall. Assume only one day has the highest value. The <code class='i'>max()</code> function must not be used.","Construct the method <code class='i'>wettestDay(int[][] rain)</code> that outputs the week number and day number of the day with the highest rainfall. Assume only one day has the highest value."),m:5,ms:["Initialise the highest value (e.g. to rain[0][0] or −1) and its position","nested loops through all weeks and days","compare each value with the highest","update the highest value and record the week and day","output the week and day after the loops"],ans:C({py:`
def wettest_day(rain):
    best = -1
    best_w = 0
    best_d = 0
    for w in range(len(rain)):
        for d in range(len(rain[w])):
            if rain[w][d] > best:
                best = rain[w][d]
                best_w = w
                best_d = d
    print("Week", best_w, "day", best_d)`,java:`
public static void wettestDay(int[][] rain) {
    int best = -1;
    int bestW = 0;
    int bestD = 0;
    for (int w = 0; w < rain.length; w++) {
        for (int d = 0; d < rain[w].length; d++) {
            if (rain[w][d] > best) {
                best = rain[w][d];
                bestW = w;
                bestD = d;
            }
        }
    }
    System.out.println("Week " + bestW + " day " + bestD);
}`})},
 {st:"B2.3",r:"B2.3.3",q:"Outline why counted loops are more appropriate than conditional loops for processing this data.",m:2,ms:["The number of weeks and days is known in advance (4 × 7)","so a counted (for) loop runs exactly the right number of times without needing a condition to stop it"]}
]},
{id:"B-results",fam:"B2",title:"Test results file",stem:"A teacher stores test results in a text file, <b>results.txt</b>. Each line holds a student's name and score separated by a comma, for example:<pre class='code'>Amira,72\nBen,45\nChen,90</pre>",parts:[
 {st:"B2.5",r:"B2.5.1",q:"State the file mode needed to add new results to the end of the file without deleting the existing data.",m:1,ms:["Append (a)"]},
 {st:"B2.5",r:"B2.5.1",q:PJ("Construct the function <code class='i'>class_average()</code> that reads results.txt and returns the average score. If the file does not exist, the function should output an error message and return 0.","Construct the method <code class='i'>classAverage()</code> that reads results.txt and returns the average score. If the file does not exist, the method should output an error message and return 0."),m:6,ms:["Open the file for reading","loop through every line of the file","split each line at the comma and convert the score part to a number","add to a total and count the scores","return total / count (handling an empty file is not required)",PJ("use try/except (FileNotFoundError/IOError) to output a message and return 0","use try/catch (FileNotFoundException/IOException) to output a message and return 0")],note:"Award [1] per marking point, max [6]. Closing the file (or using with/try-with-resources) is expected but not separately credited here.",ans:C({py:`
def class_average():
    try:
        f = open("results.txt", "r")
        total = 0
        count = 0
        for line in f:
            parts = line.strip().split(",")
            total = total + int(parts[1])
            count = count + 1
        f.close()
        return total / count
    except FileNotFoundError:
        print("results.txt not found")
        return 0`,java:`
public static double classAverage() {
    try {
        BufferedReader br = new BufferedReader(new FileReader("results.txt"));
        String line = br.readLine();
        int total = 0;
        int count = 0;
        while (line != null) {
            String[] parts = line.split(",");
            total = total + Integer.parseInt(parts[1].trim());
            count = count + 1;
            line = br.readLine();
        }
        br.close();
        return (double) total / count;
    } catch (IOException e) {
        System.out.println("results.txt not found");
        return 0;
    }
}`})},
 {st:"B2.1",r:"B2.1.3",q:"Explain the purpose of a finally block in exception handling.",m:2,ms:["The finally block always runs, whether or not an exception occurred","so clean-up code such as closing a file/releasing a resource is always carried out"]},
 {st:"B2.5",r:"B2.5.1",q:PJ("Construct the function <code class='i'>add_result(name, score)</code> that appends a new line to results.txt in the same format.","Construct the method <code class='i'>addResult(String name, int score)</code> that appends a new line to results.txt in the same format."),m:3,ms:["Open the file in append mode","write the name, a comma and the score followed by a new line","close the file"],ans:C({py:`
def add_result(name, score):
    f = open("results.txt", "a")
    f.write(name + "," + str(score) + "\\n")
    f.close()`,java:`
public static void addResult(String name, int score) throws IOException {
    FileWriter fw = new FileWriter("results.txt", true);
    fw.write(name + "," + score + "\\n");
    fw.close();
}`})},
 {st:"B2.5",r:"B2.5.1",q:"Outline why a file should be closed after it has been used.",m:2,ms:["Ensures any buffered data is written to the file (not lost)","releases the file so other programs/users can access it and frees system resources"]}
]},
// ================= OOP =================
{id:"B-book",fam:"B3",title:"Library books",stem:[PJ("A library system uses a <code class='i'>Book</code> class. The class is partially shown:","A library system uses a <code class='i'>Book</code> class. The class is partially shown:"),C({py:`
class Book:
    total_books = 0                  # number of Book objects created

    def __init__(self, title, author):
        self.__title = title
        self.__author = author
        self.__on_loan = False
        Book.total_books = Book.total_books + 1

    def get_title(self):
        return self.__title

    def is_on_loan(self):
        return self.__on_loan

    def check_out(self):
        # code missing

    def return_book(self):
        self.__on_loan = False`,java:`
public class Book {
    static int totalBooks = 0;        // number of Book objects created
    private String title;
    private String author;
    private boolean onLoan;

    public Book(String title, String author) {
        this.title = title;
        this.author = author;
        this.onLoan = false;
        totalBooks = totalBooks + 1;
    }

    public String getTitle() { return title; }

    public boolean isOnLoan() { return onLoan; }

    public boolean checkOut() {
        // code missing
    }

    public void returnBook() { onLoan = false; }
}`})],parts:[
 {st:"B3.1",r:"B3.1.2",q:"Construct a UML class diagram for the Book class.",m:3,ms:["Class name Book in the top section","attributes with types and access (− title: String, − author: String, − onLoan: boolean, totalBooks: int static/underlined)","methods with return types (+ getTitle(): String, + isOnLoan(): boolean, + checkOut(): boolean, + returnBook())"],note:"[1] per correctly completed section."},
 {st:"B3.1",r:"B3.1.4",q:PJ("List the operations carried out when <code class='i'>b1 = Book(\"Dune\", \"Herbert\")</code> is executed.","List the operations carried out when <code class='i'>Book b1 = new Book(\"Dune\", \"Herbert\");</code> is executed."),m:4,ms:["Memory is allocated for a new Book object/instance","referenced by the variable b1","title is set to \"Dune\" and author to \"Herbert\"","on loan is set to false","the static counter total books is increased by 1"]},
 {st:"B3.1",r:"B3.1.3",q:PJ("Outline one difference between <code class='i'>total_books</code> and <code class='i'>self.__title</code>.","Outline one difference between <code class='i'>totalBooks</code> and <code class='i'>title</code>."),m:2,ms:["total books is a static/class variable shared by all Book objects (one copy)","title is an instance variable — each Book object has its own copy/value"]},
 {st:"B3.1",r:"B3.1.4",q:PJ("Construct the method <code class='i'>check_out()</code>. If the book is not on loan, it should be marked as on loan and the method returns <code class='i'>True</code>; otherwise it returns <code class='i'>False</code>.","Construct the method <code class='i'>checkOut()</code>. If the book is not on loan, it should be marked as on loan and the method returns <code class='i'>true</code>; otherwise it returns <code class='i'>false</code>."),m:3,ms:["Check whether the book is currently on loan","if not, set on loan to true and return true","otherwise return false"],ans:C({py:`
def check_out(self):
    if not self.__on_loan:
        self.__on_loan = True
        return True
    return False`,java:`
public boolean checkOut() {
    if (!onLoan) {
        onLoan = true;
        return true;
    }
    return false;
}`})},
 {st:"B3.1",r:"B3.1.5",q:"Explain why the attributes of Book are declared as private.",m:2,ms:["They cannot be accessed/changed directly from outside the class (encapsulation/information hiding)","changes must go through methods such as checkOut, which keeps the object's state valid (e.g. a book cannot be checked out twice)"]},
 {st:"B3.1",r:"B3.1.4",q:PJ("A list, <code class='i'>shelf</code>, holds Book objects. Construct the function <code class='i'>available(shelf)</code> that returns the number of books in the list that are not on loan.","An ArrayList, <code class='i'>shelf</code>, holds Book objects. Construct the method <code class='i'>available(ArrayList&lt;Book&gt; shelf)</code> that returns the number of books in the list that are not on loan."),m:4,ms:["Initialise a counter to 0","loop through every Book in the list","use the isOnLoan()/is_on_loan() method to check whether each book is available","increment the counter and return it after the loop"],ans:C({py:`
def available(shelf):
    count = 0
    for b in shelf:
        if not b.is_on_loan():
            count = count + 1
    return count`,java:`
public static int available(ArrayList<Book> shelf) {
    int count = 0;
    for (Book b : shelf) {
        if (!b.isOnLoan()) {
            count = count + 1;
        }
    }
    return count;
}`})}
]},
{id:"B-account",fam:"B3",title:"Bank accounts",stem:[PJ("A bank uses an <code class='i'>Account</code> class:","A bank uses an <code class='i'>Account</code> class:"),C({py:`
class Account:
    def __init__(self, owner):
        self.__owner = owner
        self.__balance = 0.0

    def get_owner(self):
        return self.__owner

    def get_balance(self):
        return self.__balance

    def deposit(self, amount):
        # code missing

    def withdraw(self, amount):
        # code missing`,java:`
public class Account {
    private String owner;
    private double balance;

    public Account(String owner) {
        this.owner = owner;
        this.balance = 0.0;
    }

    public String getOwner() { return owner; }

    public double getBalance() { return balance; }

    public void deposit(double amount) {
        // code missing
    }

    public boolean withdraw(double amount) {
        // code missing
    }
}`})],parts:[
 {st:"B3.1",r:"B3.1.1",q:"Outline the difference between a class and an object.",m:2,ms:["A class is a blueprint/template that defines attributes and methods","an object is an instance of a class, with its own attribute values, created at run time"]},
 {st:"B3.1",r:"B3.1.4",q:"Construct the method deposit(). It adds the amount to the balance only if the amount is greater than 0.",m:3,ms:["Method with one parameter (amount)","check that amount > 0","add amount to the balance attribute"],ans:C({py:`
def deposit(self, amount):
    if amount > 0:
        self.__balance = self.__balance + amount`,java:`
public void deposit(double amount) {
    if (amount > 0) {
        balance = balance + amount;
    }
}`})},
 {st:"B3.1",r:"B3.1.4",q:"Construct the method withdraw(). If there is enough money in the account, the amount is subtracted and the method returns true; otherwise the balance is unchanged and the method returns false.",m:4,ms:["Compare the amount with the balance","if amount ≤ balance, subtract amount from balance","return true after a successful withdrawal","return false otherwise"],ans:C({py:`
def withdraw(self, amount):
    if amount <= self.__balance:
        self.__balance = self.__balance - amount
        return True
    return False`,java:`
public boolean withdraw(double amount) {
    if (amount <= balance) {
        balance = balance - amount;
        return true;
    }
    return false;
}`})},
 {st:"B3.1",r:"B3.1.5",q:"The class has a getter for the balance but no setter. Explain why this is good practice.",m:2,ms:["The balance can be read but cannot be set directly to any value from outside the class","it can only change through deposit/withdraw, which enforce the rules (e.g. no negative deposits/overdrafts), protecting the integrity of the data"]},
 {st:"B3.1",r:"B3.1.4",q:PJ("A list, <code class='i'>accounts</code>, holds Account objects. Construct the function <code class='i'>richest(accounts)</code> that returns the owner of the account with the highest balance. The <code class='i'>max()</code> function must not be used.","An array, <code class='i'>accounts</code>, holds Account objects. Construct the method <code class='i'>richest(Account[] accounts)</code> that returns the owner of the account with the highest balance."),m:4,ms:["Start with the first account as the richest","loop through the accounts","use getBalance()/get_balance() to compare and update the richest account","return the owner using getOwner()/get_owner()"],ans:C({py:`
def richest(accounts):
    best = accounts[0]
    for a in accounts:
        if a.get_balance() > best.get_balance():
            best = a
    return best.get_owner()`,java:`
public static String richest(Account[] accounts) {
    Account best = accounts[0];
    for (Account a : accounts) {
        if (a.getBalance() > best.getBalance()) {
            best = a;
        }
    }
    return best.getOwner();
}`})},
 {st:"B3.1",r:"B3.1.1",q:"Outline one disadvantage of using object-oriented programming for a small program.",m:2,ms:["Designing classes adds extra planning and code (overhead)","which may make a simple program longer/more complex than a procedural solution"]}
]},
{id:"B-sensor",fam:"B3",title:"Greenhouse sensors",stem:[PJ("A greenhouse uses a <code class='i'>Sensor</code> class to store temperature readings:","A greenhouse uses a <code class='i'>Sensor</code> class to store temperature readings:"),C({py:`
class Sensor:
    LIMIT = 35                         # maximum safe temperature

    def __init__(self, sensor_id):
        self.__id = sensor_id
        self.__readings = []

    def get_id(self):
        return self.__id

    def add_reading(self, value):
        self.__readings.append(value)

    def count_above_limit(self):
        # code missing

    def latest(self):
        # code missing`,java:`
public class Sensor {
    static final int LIMIT = 35;       // maximum safe temperature
    private String id;
    private ArrayList<Double> readings;

    public Sensor(String id) {
        this.id = id;
        this.readings = new ArrayList<Double>();
    }

    public String getId() { return id; }

    public void addReading(double value) { readings.add(value); }

    public int countAboveLimit() {
        // code missing
    }

    public double latest() {
        // code missing
    }
}`})],parts:[
 {st:"B3.1",r:"B3.1.3",q:"Outline why LIMIT is declared as a static (class) variable.",m:2,ms:["The limit is the same for every Sensor object","so only one shared copy is needed/it can be changed in one place for all sensors"]},
 {st:"B3.1",r:"B3.1.4",q:PJ("Construct the method <code class='i'>count_above_limit()</code> that returns how many readings are above LIMIT.","Construct the method <code class='i'>countAboveLimit()</code> that returns how many readings are above LIMIT."),m:3,ms:["Loop through the readings","compare each reading with LIMIT (class variable)","count and return the number above"],ans:C({py:`
def count_above_limit(self):
    count = 0
    for r in self.__readings:
        if r > Sensor.LIMIT:
            count = count + 1
    return count`,java:`
public int countAboveLimit() {
    int count = 0;
    for (double r : readings) {
        if (r > LIMIT) {
            count = count + 1;
        }
    }
    return count;
}`})},
 {st:"B2.1",r:"B2.1.3",q:PJ("Construct the method <code class='i'>latest()</code> that returns the most recent reading. If there are no readings, it should catch the resulting IndexError and return <code class='i'>None</code>.","Construct the method <code class='i'>latest()</code> that returns the most recent reading. If there are no readings, it should catch the resulting IndexOutOfBoundsException and return -999."),m:4,ms:["Access the last element of the readings list","return it","inside a try block","catch the exception and return the stated value"],ans:C({py:`
def latest(self):
    try:
        return self.__readings[-1]
    except IndexError:
        return None`,java:`
public double latest() {
    try {
        return readings.get(readings.size() - 1);
    } catch (IndexOutOfBoundsException e) {
        return -999;
    }
}`})},
 {st:"B2.2",r:"B2.2.2",q:PJ("Outline why a Python list is suitable for storing the readings.","Outline why an ArrayList is more suitable than an array for storing the readings."),m:2,ms:["The number of readings is not known in advance/keeps growing","a dynamic list can grow as readings are added (no fixed size)"]},
 {st:"B3.1",r:"B3.1.2",q:PJ("The greenhouse has a list of Sensor objects called <code class='i'>sensors</code>. Construct the function <code class='i'>alert(sensors)</code> that outputs the id of every sensor with more than 3 readings above the limit.","The greenhouse has an ArrayList of Sensor objects called <code class='i'>sensors</code>. Construct the method <code class='i'>alert(ArrayList&lt;Sensor&gt; sensors)</code> that outputs the id of every sensor with more than 3 readings above the limit."),m:4,ms:["Loop through every Sensor object","call the count method for each sensor","compare the result with 3 (> 3)","output the id using the getter"],ans:C({py:`
def alert(sensors):
    for s in sensors:
        if s.count_above_limit() > 3:
            print(s.get_id())`,java:`
public static void alert(ArrayList<Sensor> sensors) {
    for (Sensor s : sensors) {
        if (s.countAboveLimit() > 3) {
            System.out.println(s.getId());
        }
    }
}`})},
 {st:"B3.1",r:"B3.1.1",q:"Outline how encapsulation is shown in the Sensor class.",m:2,ms:["The id and readings attributes are private","they are accessed only through public methods (getId, addReading), so readings cannot be altered directly"]}
]}
];
