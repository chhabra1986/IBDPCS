/* Theme B HL-only questions (Paper 2 HL). */
const SQBH=[
{id:"H-recur",fam:"BR",hl:1,title:"Recursion",stem:["Consider the following recursive "+"",PJ("function:","method:"),C({py:`
def mystery(n):
    if n <= 0:
        return 0
    return n % 10 + mystery(n // 10)`,java:`
public static int mystery(int n) {
    if (n <= 0) {
        return 0;
    }
    return n % 10 + mystery(n / 10);
}`})],parts:[
 {st:"B2.4",r:"B2.4.4",q:"Identify the base case in mystery().",m:1,ms:["When n ≤ 0 (it returns 0)"]},
 {st:"B2.4",r:"B2.4.5",q:"Trace the call mystery(352), showing each recursive call and the value returned.",m:3,ms:["mystery(352) = 2 + mystery(35)","mystery(35) = 5 + mystery(3); mystery(3) = 3 + mystery(0) = 3 + 0","final value returned is 10"]},
 {st:"B2.4",r:"B2.4.5",q:PJ("Construct an iterative function, <code class='i'>mystery_iter(n)</code>, that returns the same value as mystery(n) for any n ≥ 0.","Construct an iterative method, <code class='i'>mysteryIter(int n)</code>, that returns the same value as mystery(n) for any n ≥ 0."),m:4,ms:["Initialise a total to 0","loop while n > 0","add n mod 10 to the total and replace n with n div 10","return the total"],ans:C({py:`
def mystery_iter(n):
    total = 0
    while n > 0:
        total = total + n % 10
        n = n // 10
    return total`,java:`
public static int mysteryIter(int n) {
    int total = 0;
    while (n > 0) {
        total = total + n % 10;
        n = n / 10;
    }
    return total;
}`})},
 {st:"B2.4",r:"B2.4.4",q:"A different recursive method, countDown(n), calls itself with n − 1 until n is 0. Explain why a run-time error might occur when countDown(100000) is called.",m:3,ms:["Each recursive call adds a new frame (parameters, return address, local variables) to the call stack","100 000 calls would be on the stack at once before any returns","the stack runs out of memory, causing a stack overflow (RecursionError in Python / StackOverflowError in Java)"]},
 {st:"B2.4",r:"B2.4.4",q:"Describe how quicksort uses recursion to sort a list.",m:3,ms:["A pivot element is chosen","the list is partitioned so smaller elements are on one side of the pivot and larger on the other","quicksort is then called recursively on each part","base case: a part with 0 or 1 elements is already sorted"]},
 {st:"B2.4",r:"B2.4.4",q:"Outline one situation where recursion is a better choice than iteration.",m:2,ms:["When the problem can be broken into smaller similar sub-problems, e.g. traversing a binary tree/drawing fractals/quicksort","the recursive solution is shorter and closer to the problem's definition, so easier to write and understand"]}
]},
{id:"H-linked",fam:"B4",hl:1,title:"Game leaderboard (singly linked list)",stem:["A computer game stores players in a singly linked list. Each node stores a name, a score and a reference to the next node.",C({py:`
class Node:
    def __init__(self, name, score):
        self.name = name
        self.score = score
        self.next = None

class Leaderboard:
    def __init__(self):
        self.head = None`,java:`
class Node {
    String name;
    int score;
    Node next;

    Node(String name, int score) {
        this.name = name;
        this.score = score;
        this.next = null;
    }
}

class Leaderboard {
    Node head = null;
}`})],parts:[
 {st:"B4.1",r:"B4.1.2",q:"Players Ana (50), Bo (70) and Cy (40) are added in that order, each at the front of an empty list. Sketch the resulting linked list.",m:2,ms:["head → Cy(40) → Bo(70) → Ana(50)","last node points to null/None"]},
 {st:"B4.1",r:"B4.1.3",q:PJ("Construct the Leaderboard method <code class='i'>add_front(name, score)</code> that inserts a new node at the front of the list.","Construct the Leaderboard method <code class='i'>addFront(String name, int score)</code> that inserts a new node at the front of the list."),m:3,ms:["Create a new Node with the name and score","set the new node's next to the current head","set head to the new node"],ans:C({py:`
def add_front(self, name, score):
    node = Node(name, score)
    node.next = self.head
    self.head = node`,java:`
public void addFront(String name, int score) {
    Node node = new Node(name, score);
    node.next = head;
    head = node;
}`})},
 {st:"B4.1",r:"B4.1.3",q:PJ("Construct the Leaderboard method <code class='i'>find_score(name)</code> that returns the score of the named player, or −1 if the player is not in the list.","Construct the Leaderboard method <code class='i'>findScore(String name)</code> that returns the score of the named player, or −1 if the player is not in the list."),m:4,ms:["Start a pointer at head","loop while the pointer is not null","if the node's name matches, return its score; otherwise move to next","return −1 after the loop"],ans:C({py:`
def find_score(self, name):
    current = self.head
    while current is not None:
        if current.name == name:
            return current.score
        current = current.next
    return -1`,java:`
public int findScore(String name) {
    Node current = head;
    while (current != null) {
        if (current.name.equals(name)) {
            return current.score;
        }
        current = current.next;
    }
    return -1;
}`})},
 {st:"B4.1",r:"B4.1.3",q:PJ("Construct the Leaderboard method <code class='i'>remove(name)</code> that deletes the first node containing the given name. If the name is not found, the list is unchanged.","Construct the Leaderboard method <code class='i'>remove(String name)</code> that deletes the first node containing the given name. If the name is not found, the list is unchanged."),m:5,ms:["Handle an empty list","if the head node matches, set head to head.next","otherwise traverse keeping track of the previous node","when the matching node is found, set previous.next to current.next (bypass it)","stop after removing/at the end of the list without error"],ans:C({py:`
def remove(self, name):
    if self.head is None:
        return
    if self.head.name == name:
        self.head = self.head.next
        return
    prev = self.head
    current = self.head.next
    while current is not None:
        if current.name == name:
            prev.next = current.next
            return
        prev = current
        current = current.next`,java:`
public void remove(String name) {
    if (head == null) {
        return;
    }
    if (head.name.equals(name)) {
        head = head.next;
        return;
    }
    Node prev = head;
    Node current = head.next;
    while (current != null) {
        if (current.name.equals(name)) {
            prev.next = current.next;
            return;
        }
        prev = current;
        current = current.next;
    }
}`})},
 {st:"B4.1",r:"B4.1.2",q:"Evaluate the use of a linked list rather than an array for this leaderboard, where players join and leave frequently.",m:3,ms:["Insertion/deletion only changes references — no shifting of elements, so it is efficient (O(1) at the front)","the list grows and shrinks dynamically, using only the memory needed","but there is no direct (indexed) access — finding a player is O(n)","each node needs extra memory for the reference"],note:"Award [3] for a balanced answer with at least one advantage and one disadvantage."},
 {st:"B4.1",r:"B4.1.2",q:"Outline one advantage of a doubly linked list over a singly linked list.",m:2,ms:["Each node also stores a reference to the previous node","so the list can be traversed in both directions/a node can be deleted without searching for its predecessor"]}
]},
{id:"H-bst",fam:"B4",hl:1,title:"Binary search tree of names",stem:"The following names are inserted, in this order, into an empty binary search tree (BST), using alphabetical order:<br><code class='i'>Maya, Dev, Tom, Ali, Fin, Sam, Zoe</code>",parts:[
 {st:"B4.1",r:"B4.1.4",q:"Sketch the binary search tree.",m:3,ms:["Maya at the root","Dev as left child and Tom as right child of Maya","Ali and Fin as left and right children of Dev; Sam and Zoe as left and right children of Tom"]},
 {st:"B4.1",r:"B4.1.4",q:"State the output of an in-order traversal of the tree.",m:2,ms:["Ali, Dev, Fin, Maya, Sam, Tom, Zoe"],note:"[1] for one error."},
 {st:"B4.1",r:"B4.1.4",q:"State the nodes visited, in order, when searching for Sam.",m:1,ms:["Maya, Tom, Sam"]},
 {pre:C({py:`
class TreeNode:
    def __init__(self, name):
        self.name = name
        self.left = None
        self.right = None`,java:`
class TreeNode {
    String name;
    TreeNode left = null;
    TreeNode right = null;

    TreeNode(String name) { this.name = name; }
}`}),st:"B4.1",r:"B4.1.4",q:PJ("Construct the recursive function <code class='i'>contains(node, target)</code> that returns True if target is in the tree rooted at node, and False otherwise.","Construct the recursive method <code class='i'>contains(TreeNode node, String target)</code> that returns true if target is in the tree rooted at node, and false otherwise."),m:5,ms:["Base case: node is null/None → return false","base case: node's name equals target → return true","if target is less than the node's name, recurse on the left child","otherwise recurse on the right child","return the result of the recursive call"],ans:C({py:`
def contains(node, target):
    if node is None:
        return False
    if node.name == target:
        return True
    if target < node.name:
        return contains(node.left, target)
    return contains(node.right, target)`,java:`
public static boolean contains(TreeNode node, String target) {
    if (node == null) {
        return false;
    }
    if (node.name.equals(target)) {
        return true;
    }
    if (target.compareTo(node.name) < 0) {
        return contains(node.left, target);
    }
    return contains(node.right, target);
}`})},
 {st:"B4.1",r:"B4.1.4",q:"Explain why searching would be slower if the same names were inserted in alphabetical order.",m:3,ms:["Each new name would be greater than all previous names, so it is always added as a right child","the tree becomes unbalanced — effectively a linked list","so a search may visit every node: O(n) instead of O(log n)"]},
 {st:"B4.1",r:"B4.1.4",q:"Describe how Dev would be deleted from the original tree.",m:3,ms:["Dev has two children","replace Dev with its in-order successor (smallest node in its right subtree), Fin (or the in-order predecessor, Ali)","then remove Fin from its original position (it is a leaf, so simply removed)"]}
]},
{id:"H-hash",fam:"B4",hl:1,title:"Hash tables and sets",stem:"An airline app uses hash-based data structures to store airport codes and passengers' email addresses.",parts:[
 {st:"B4.1",r:"B4.1.6",q:PJ("Construct code that creates a dictionary called <code class='i'>airports</code>, adds the entries LHR → London and DEL → Delhi, and then outputs the city for the code DEL.","Construct code that creates a HashMap called <code class='i'>airports</code>, adds the entries LHR → London and DEL → Delhi, and then outputs the city for the code DEL."),m:3,ms:[PJ("Create an empty dictionary","Create a HashMap&lt;String, String&gt;"),PJ("add both key–value pairs","use put() to add both key–value pairs"),PJ("print(airports[\"DEL\"]) or airports.get(\"DEL\")","System.out.println(airports.get(\"DEL\"))")],ans:C({py:`
airports = {}
airports["LHR"] = "London"
airports["DEL"] = "Delhi"
print(airports["DEL"])`,java:`
HashMap<String, String> airports = new HashMap<String, String>();
airports.put("LHR", "London");
airports.put("DEL", "Delhi");
System.out.println(airports.get("DEL"));`})},
 {st:"B4.1",r:"B4.1.6",q:"Explain how a hash table stores and finds an entry, and describe one method of collision resolution.",m:4,ms:["A hash function converts the key into an index/bucket number","the value is stored at that index, so it can be found directly by hashing the key again (average O(1))","a collision occurs when two keys hash to the same index","chaining: each bucket holds a list of entries / open addressing (linear probing): the next free slot is used"]},
 {st:"B4.1",r:"B4.1.6",q:"Outline what is meant by the load factor of a hash table and why it matters.",m:2,ms:["Load factor = number of entries ÷ number of buckets/slots","as it increases, collisions become more frequent and performance falls, so the table is resized (rehashed) above a threshold"]},
 {st:"B4.1",r:"B4.1.5",q:"State the output of the following code.",pre:C({py:`
a = {1, 2, 3, 4}
b = {3, 4, 5}
print(a & b)
print(a - b)
print(b.issubset(a))`,java:`
Set<Integer> a = new HashSet<Integer>(Arrays.asList(1, 2, 3, 4));
Set<Integer> b = new HashSet<Integer>(Arrays.asList(3, 4, 5));
Set<Integer> c = new HashSet<Integer>(a);
c.retainAll(b);
System.out.println(c);
Set<Integer> d = new HashSet<Integer>(a);
d.removeAll(b);
System.out.println(d);
System.out.println(a.containsAll(b));`}),m:3,ms:[PJ("{3, 4}","[3, 4]"),PJ("{1, 2}","[1, 2]"),PJ("False","false")]},
 {st:"B4.1",r:"B4.1.5",q:PJ("Construct the function <code class='i'>unique(emails)</code> that returns a new list containing each email address from the list <code class='i'>emails</code> only once, in the order they first appear. Use a set.","Construct the method <code class='i'>unique(ArrayList&lt;String&gt; emails)</code> that returns a new ArrayList containing each email address only once, in the order they first appear. Use a HashSet."),m:4,ms:["Create an empty set and an empty result list","loop through each email","if the email is not in the set, add it to the result list","and add it to the set; return the result list"],ans:C({py:`
def unique(emails):
    seen = set()
    result = []
    for e in emails:
        if e not in seen:
            result.append(e)
            seen.add(e)
    return result`,java:`
public static ArrayList<String> unique(ArrayList<String> emails) {
    HashSet<String> seen = new HashSet<String>();
    ArrayList<String> result = new ArrayList<String>();
    for (String e : emails) {
        if (!seen.contains(e)) {
            result.add(e);
            seen.add(e);
        }
    }
    return result;
}`})},
 {st:"B4.1",r:"B4.1.1",q:"Outline what is meant by an abstract data type (ADT).",m:2,ms:["A description of a data structure in terms of the data it holds and the operations that can be performed on it","without specifying how it is implemented (e.g. a stack defined by push/pop/peek)"]}
]},
{id:"H-vehicle",fam:"B3H",hl:1,title:"Vehicle hire (inheritance and polymorphism)",stem:["A vehicle hire company uses the following classes.",C({py:`
from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, reg, rate):
        self._reg = reg          # registration number
        self._rate = rate        # daily hire rate

    def get_reg(self):
        return self._reg

    @abstractmethod
    def cost(self, days):
        pass

class Car(Vehicle):
    def __init__(self, reg, rate, seats):
        super().__init__(reg, rate)
        self.__seats = seats

    def cost(self, days):
        return self._rate * days`,java:`
public abstract class Vehicle {
    protected String reg;      // registration number
    protected double rate;     // daily hire rate

    public Vehicle(String reg, double rate) {
        this.reg = reg;
        this.rate = rate;
    }

    public String getReg() { return reg; }

    public abstract double cost(int days);
}

public class Car extends Vehicle {
    private int seats;

    public Car(String reg, double rate, int seats) {
        super(reg, rate);
        this.seats = seats;
    }

    public double cost(int days) {
        return rate * days;
    }
}`})],parts:[
 {st:"B3.2",r:"B3.2.3",q:"Outline why Vehicle is declared as an abstract class.",m:2,ms:["No Vehicle object should be created directly — only specific types (Car, Truck)","it defines a common interface (cost) that every subclass must implement"]},
 {st:"B3.2",r:"B3.2.1",q:PJ("Explain the effect of the single underscore in <code class='i'>self._rate</code> compared with the double underscore in <code class='i'>self.__seats</code>.","Explain the effect of the protected modifier on rate compared with the private modifier on seats."),m:2,ms:["rate is protected — it is intended to be accessed by subclasses such as Car (and Truck)","seats is private — it can only be accessed inside the Car class"]},
 {st:"B3.2",r:"B3.2.1",q:"A Truck is a Vehicle with an extra attribute, load (in tonnes). The cost of hiring a truck is the daily rate × days plus 20 for each tonne of load. Construct the Truck class.",m:5,ms:["Class header showing Truck inherits from Vehicle","constructor taking reg, rate and load","calls the parent constructor (super) with reg and rate","stores load as a private attribute","overrides cost(days) returning rate × days + 20 × load"],ans:C({py:`
class Truck(Vehicle):
    def __init__(self, reg, rate, load):
        super().__init__(reg, rate)
        self.__load = load

    def cost(self, days):
        return self._rate * days + 20 * self.__load`,java:`
public class Truck extends Vehicle {
    private double load;

    public Truck(String reg, double rate, double load) {
        super(reg, rate);
        this.load = load;
    }

    public double cost(int days) {
        return rate * days + 20 * load;
    }
}`})},
 {st:"B3.2",r:"B3.2.2",q:PJ("Construct the function <code class='i'>total_cost(fleet, days)</code> that returns the total cost of hiring every vehicle in the list <code class='i'>fleet</code> for the given number of days.","Construct the method <code class='i'>totalCost(ArrayList&lt;Vehicle&gt; fleet, int days)</code> that returns the total cost of hiring every vehicle in the list for the given number of days."),m:3,ms:["Initialise a total","loop through every vehicle, calling its cost(days) method","return the total"],ans:C({py:`
def total_cost(fleet, days):
    total = 0
    for v in fleet:
        total = total + v.cost(days)
    return total`,java:`
public static double totalCost(ArrayList<Vehicle> fleet, int days) {
    double total = 0;
    for (Vehicle v : fleet) {
        total = total + v.cost(days);
    }
    return total;
}`})},
 {st:"B3.2",r:"B3.2.2",q:"Explain how the method in the previous part shows polymorphism.",m:3,ms:["The fleet holds objects of different subclasses (Car, Truck) treated as Vehicles","the same call v.cost(days) is made on each object","the version of cost that runs depends on the object's actual class at run time (dynamic binding/method overriding)"]},
 {st:"B3.2",r:"B3.2.2",q:"Distinguish between method overriding and method overloading.",m:2,ms:["Overriding: a subclass provides its own version of a method with the same name and parameters as the parent (dynamic polymorphism)","overloading: methods in the same class share a name but have different parameter lists (static polymorphism)"]}
]},
{id:"H-design",fam:"B3H",hl:1,title:"Class relationships and design patterns",stem:"A school timetabling program contains the classes School, Classroom, Teacher and Timetable. Each Classroom exists only as part of a School. Teachers can move between schools.",parts:[
 {st:"B3.2",r:"B3.2.4",q:"Distinguish between composition and aggregation, using School, Classroom and Teacher as examples.",m:4,ms:["Composition: a strong 'part-of' relationship — the part cannot exist without the whole","e.g. a Classroom is created and destroyed with its School","Aggregation: a weaker 'has-a' relationship — the part can exist independently","e.g. a Teacher can exist without/move between Schools"]},
 {st:"B3.2",r:"B3.2.5",q:"The program must have exactly one Timetable object that all parts of the program share. Explain how the singleton pattern achieves this.",m:3,ms:["The constructor is made private/inaccessible from outside","the class holds a static reference to its single instance","a static method (e.g. getInstance) creates the instance the first time it is called and returns the same instance every time after that"]},
 {st:"B3.2",r:"B3.2.5",q:PJ("Construct a Timetable class that uses the singleton pattern. It needs only the code required to create and return the single instance.","Construct a Timetable class that uses the singleton pattern. It needs only the code required to create and return the single instance."),m:4,ms:["Static/class variable to hold the instance, initially null/None","constructor not used directly (private in Java)","static method get_instance/getInstance","creates the instance only if it does not exist yet and returns it"],ans:C({py:`
class Timetable:
    _instance = None

    @staticmethod
    def get_instance():
        if Timetable._instance is None:
            Timetable._instance = Timetable()
        return Timetable._instance`,java:`
public class Timetable {
    private static Timetable instance = null;

    private Timetable() { }

    public static Timetable getInstance() {
        if (instance == null) {
            instance = new Timetable();
        }
        return instance;
    }
}`})},
 {st:"B3.2",r:"B3.2.5",q:"When the timetable changes, the student app, the teacher app and the display screens must all update. Describe how the observer pattern could be used.",m:3,ms:["The Timetable is the subject; the apps and screens are observers","observers register (subscribe) with the subject","when the timetable changes, it notifies all registered observers (calls their update method) so they refresh automatically"]},
 {st:"B3.2",r:"B3.2.5",q:"Outline the purpose of the factory pattern.",m:2,ms:["A factory method/class creates objects on behalf of the client","so the client does not need to know the exact subclass being created (e.g. creating different room types from a type code)"]}
]},
{id:"H-playlist",fam:"B4",hl:1,title:"Music playlist (circular and doubly linked lists)",stem:["A music player stores a playlist as a <b>circular</b> singly linked list: the last song's next reference points back to the first song. The player keeps a reference, <code class='i'>head</code>, to the first song.",C({py:`
class Song:
    def __init__(self, title):
        self.title = title
        self.next = None`,java:`
class Song {
    String title;
    Song next = null;

    Song(String title) { this.title = title; }
}`})],parts:[
 {st:"B4.1",r:"B4.1.2",q:"Outline why a circular linked list is suitable for a playlist set to repeat.",m:2,ms:["After the last song, the next reference leads back to the first song","so playback can continue in a loop without special handling at the end"]},
 {st:"B4.1",r:"B4.1.3",q:PJ("Construct the function <code class='i'>print_all(head)</code> that outputs every song title exactly once. Assume the list is not empty.","Construct the method <code class='i'>printAll(Song head)</code> that outputs every song title exactly once. Assume the list is not empty."),m:4,ms:["Start a pointer at head","output the current title and move to next","repeat until the pointer returns to head (not null — the list is circular)","ensures head is printed once (e.g. do-while or print head first)"],ans:C({py:`
def print_all(head):
    current = head
    print(current.title)
    current = current.next
    while current is not head:
        print(current.title)
        current = current.next`,java:`
public static void printAll(Song head) {
    Song current = head;
    do {
        System.out.println(current.title);
        current = current.next;
    } while (current != head);
}`})},
 {st:"B4.1",r:"B4.1.3",q:PJ("Construct the function <code class='i'>insert_after(node, title)</code> that inserts a new Song with the given title immediately after the given node.","Construct the method <code class='i'>insertAfter(Song node, String title)</code> that inserts a new Song with the given title immediately after the given node."),m:3,ms:["Create a new Song","set the new song's next to node's next","set node's next to the new song"],ans:C({py:`
def insert_after(node, title):
    s = Song(title)
    s.next = node.next
    node.next = s`,java:`
public static void insertAfter(Song node, String title) {
    Song s = new Song(title);
    s.next = node.next;
    node.next = s;
}`})},
 {st:"B4.1",r:"B4.1.2",q:"The player adds a 'previous song' button. Explain why a doubly linked list would make this feature more efficient.",m:3,ms:["Each node in a doubly linked list stores a reference to the previous node as well as the next","so moving to the previous song is a single step (O(1))","in a singly (circular) list, the player would have to traverse almost the whole list to find the previous song (O(n))"]},
 {st:"B4.1",r:"B4.1.2",q:"Sketch how a new song X is inserted between songs A and B in a doubly linked list, showing which references change.",m:3,ms:["X.prev = A and X.next = B","A.next changed to X","B.prev changed to X"]}
]}
];
