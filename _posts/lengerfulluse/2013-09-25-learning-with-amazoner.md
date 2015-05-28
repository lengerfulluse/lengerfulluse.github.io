---
layout: post
category: interview 
tags: [algorithm, interview]
---
{% include JB/setup %}

### 1. A Simple Algorithm for Print All Combination of Balanced Parentheses###     
{% highlight cpp linenos=table %}
    #include<iostream>
    #include<cassert>
    using namespace std;
    const int MAX = 20;
    void print_bracket(int level, char out[], int n, int flag);
    void print_bracket_v2(int n, int pos, int close, int open);
    int main() {
        int n = 3;
        int flag = 0;
        char* out = new char[2*n];
        /* we can define a static char array inside the print_bracket function */
        print_bracket(2*n, out, 2*n, flag);
        cout<<"another method:"<<endl;
        print_bracket_v2(n, 0, 0, 0);
        return 0;
    }
    
    void print_bracket_v2(int n, int pos, int close, int open) {
        static char output[MAX];
        if(close == n) {
            for(int i=0; i<2*n; i++) {
                cout<<output[i]<<"\t";
            }
            cout<<endl;
            return;
        }
    
        if(open < n) {
            output[pos] = '(';
            print_bracket_v2(n, pos+1, close, open+1);
        }
        if(open > close) {
            output[pos] = ')';
            print_bracket_v2(n, pos+1, close+1, open);
        }
    }
    void print_bracket(int level, char out[], int len, int flag) {
        if(level == 0) {
            if(flag == 0) {
                for(int i=len-1; i>=0; i--) {
                    cout<<out[i]<<"\t";
                }
                cout<<endl;
            }
            return;
        }
        /* this condition filter the illegal bracket */
        if(flag < 0) {
            return;
        }
    
        out[level-1] = '(';
        flag++;
        print_bracket(level-1, out, len, flag);
        /* recover the modified flag */
        flag--;
    
        out[level-1] = ')';
        flag--;
        print_bracket(level-1, out, len, flag);
    }
{% endhighlight %}     

### 2. Find the Element Pair in Array with Sum Equals to a integer ###    

