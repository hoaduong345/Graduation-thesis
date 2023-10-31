class DataDateFilterProps {
    from: Date;
    to: Date;
  
    constructor(from: Date, to: Date) {
      this.from = from;
      this.to = to;
    }
  
    toString(): string {
      return JSON.stringify({ from: this.from, to: this.to });
    }
  }
  
  class DateFilter {
    label: string;
    value: string;
  
    constructor(label: string, value: string) {
      this.label = label;
      this.value = value;
    }
  }
  
  class DataDateFilter {
    data: DateFilter[] = [
      new DateFilter(
        "Today",
        new DataDateFilterProps(
          new Date(),
          new Date(new Date().setHours(23, 59, 59, 999))
        ).toString()
      ),
      new DateFilter(
        "Yesterday",
        new DataDateFilterProps(
          new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
          new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
        ).toString()
      ),
      new DateFilter(
        "This week",
        new DataDateFilterProps(
          new Date(),
          new Date(new Date().setDate(new Date().getDate() + (7 - new Date().getDay())))
        ).toString()
      ),
      new DateFilter(
        "Last week",
        new DataDateFilterProps(
          new Date(
            new Date().setDate(new Date().getDate() - (7 + new Date().getDay()))
          ),
          new Date(
            new Date().setDate(new Date().getDate() - (1 + new Date().getDay()))
          )
        ).toString()
      ),
      new DateFilter(
        "This month",
        new DataDateFilterProps(
          new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          new Date(
            new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999)
          )
        ).toString()
      ),
    ];
  }
  