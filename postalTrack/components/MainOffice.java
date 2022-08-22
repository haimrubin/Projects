package components;

import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.locks.ReadWriteLock;

import javax.swing.JPanel;

/**
 * @author HaimRubin-209467281 & MatanFadida-315585505
 * <br>This class manages the entire system
 * <p>fields:
 * <br>clock - Represents the amount of beats that have passed since the system was started (integer)
 * <br>hub- An object of a sorting center, contains all the branches ({@link} Hub)
 * <br>packages - A collection of all the packages that exist in the system ({@link}Package)
 * <br>getInstance - do class to singleton and get the instance
 * <br>WriteTraking - write to traking.txt  
 * <br>executor - ThreadPool for customer
 */


public class MainOffice implements Runnable{
	private static int clock=0;
	private static Hub hub;
	private ArrayList<Package> packages=new ArrayList<Package>();
	private JPanel panel;
	private int maxPackages;
	private boolean threadSuspend = false;
	static private volatile MainOffice instance = null;
	private ArrayList<Customer> customer=new ArrayList<Customer>();
	int numberPack;
	public static final java.util.concurrent.locks.ReadWriteLock lock = new java.util.concurrent.locks.ReentrantReadWriteLock();
	static File file = new File("C:\\Users\\מתן פדידה\\Desktop\\traking.txt");
	static DataOutputStream out = null;
	int trucks;
	private ArrayList<Thread> customerThread =new ArrayList<Thread>();
	Executor executor = Executors.newFixedThreadPool (2);
	
	private MainOffice(int branches, int trucksForBranch, JPanel panel, int maxPack) {
		trucks = trucksForBranch;
		this.panel = panel;
		this.maxPackages = maxPack;
		addHub(trucksForBranch);
		addBranches(branches, trucksForBranch);
		AddCustomer();
		System.out.println("\n\n========================== START ==========================");
		try {
			out = new DataOutputStream(new FileOutputStream(file));
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			if (out != null) 
			{
				try
				{
					out.close();
				} 
				catch (IOException e) {e.printStackTrace();}
			}
		}
	}
	
	public int getTrucks() {
		return trucks;
	}

	public static MainOffice getInstance() {
		if(instance == null)
			synchronized (MainOffice.class) {
				if (instance == null)
					instance = new MainOffice(0,0,null,0);
			}
		return instance;
	}
	
	public static MainOffice getInstance(int branches, int trucksForBranch, JPanel panel, int maxPack) {
		if(instance == null)
			synchronized (MainOffice.class) {
				if (instance == null)
					instance = new MainOffice(branches,trucksForBranch, panel, maxPack);
			}
		return instance;
	}
	
	
	public static Hub getHub() {
		return hub;
	}


	public static int getClock() {
		return clock;
	}
	
	public void finish(int i) {
		customerThread.get(i).interrupt();
		
	}

	@Override
	public void run() {
		Thread hubThrad = new Thread(hub);
		hubThrad.start();
		for (Customer c : customer ) {
			executor.execute(c);
		}
		((ExecutorService) executor).shutdown();
		
		for (Truck t : hub.listTrucks) {
			Thread trackThread = new Thread(t);
			trackThread.start();
		}
		for (Branch b: hub.getBranches()) {
			Thread branch = new Thread(b);
			for (Truck t : b.listTrucks) {
				Thread trackThread = new Thread(t);
				trackThread.start();
			}
			branch.start();
		}
		while((!((ExecutorService) executor).isTerminated())) {
		    synchronized(this) {
                while (threadSuspend)
					try {
						wait();
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
		    }
			tick();
		}
		setSuspend();
		
	}
	
	/**
	 * Prints a follow-up report for all packages in the system
	 */
	public void printReport() {
		for (Package p: packages) {
			System.out.println("\nTRACKING " +p);
			for (Tracking t: p.getTracking())
				System.out.println(t);
		}
	}
	
	/**
	 * Prints the value of the watch in MM: SS format
	 * @return String
	 */
	public String clockString() {
		String s="";
		int minutes=clock/60;
		int seconds=clock%60;
		s+=(minutes<10) ? "0" + minutes : minutes;
		s+=":";
		s+=(seconds<10) ? "0" + seconds : seconds;
		return s;
	}
	
	/**
	 * Represents a clock beat
	 * <br>For each pulse all WORK functions in the system are activated (vehicles and branches)
	 */
	public void tick() {
		try {
			Thread.sleep(300);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(clockString());
		clock++;
//		if (clock++%5==0 && maxPackages>0) {
//			addPackage();
//			maxPackages--;
//		}
		/*branchWork(hub);
		for (Branch b:hub.getBranches()) {
			branchWork(b);
		}*/
		panel.repaint();
	}
	
	
	
	public void branchWork(Branch b) {
		for (Truck t : b.listTrucks) {
			t.work();
		}
		b.work();
	}
	
	
	public void addHub(int trucksForBranch) {
		hub=new Hub();
		for (int i=0; i<trucksForBranch; i++) {
			Truck t = new StandardTruck();
			hub.addTruck(t);
		}
		Truck t=new NonStandardTruck();
		hub.addTruck(t);
	}
	
	
	public void addBranches(int branches, int trucks) {
		for (int i=0; i<branches; i++) {
			Branch branch=new Branch();
			for (int j=0; j<trucks; j++) {
				branch.addTruck(new Van());
			}
			hub.add_branch(branch);		
		}
	}
	
	public void AddCustomer() {
		for(int i=0; i < 10; i++) {
			Customer c =new Customer();
			customer.add(c);
		}
	}
	
	static void WriteTraking(Registration T) {
		try {
			lock.writeLock().lock();
			out = new DataOutputStream(new FileOutputStream(file,true));
			out.writeInt(T.getCounter());
			out.writeChar('\t');
			out.writeInt(T.getIdPack());
			out.writeChar('\t');
			out.writeUTF(T.getStatusPack());
			out.writeChar('\t');
			out.writeInt(T.getSender().getZip());
			out.writeChar('-');
			out.writeInt(T.getSender().getStreet());
			out.writeChar('\n');
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}


		finally
		{
			if (out != null) 
			{
				try
				{
					lock.writeLock().unlock();
					out.close();
				} 
				catch (IOException e) {e.printStackTrace();}
			}
		}


	}
	
	
	public ArrayList<Package> getPackages(){
		return this.packages;
	}
	
	/**
	 * Adds a random package to the system
	 */
	public synchronized Package addPackage(Address sender) {
		Random r = new Random();
		Package p;
		Branch br;
		Priority priority=Priority.values()[r.nextInt(3)];
		Address dest = new Address(r.nextInt(hub.getBranches().size()), r.nextInt(999999)+100000);

		switch (r.nextInt(3)){
		case 0:
			p = new SmallPackage(priority,  sender, dest, r.nextBoolean() );
			br = hub.getBranches().get(sender.zip);
			br.addPackage(p);
			p.setBranch(br); 
			break;
		case 1:
			p = new StandardPackage(priority,  sender, dest, r.nextFloat()+(r.nextInt(9)+1));
			br = hub.getBranches().get(sender.zip); 
			br.addPackage(p);
			p.setBranch(br); 
			break;
		case 2:
			p=new NonStandardPackage(priority,  sender, dest,  r.nextInt(1000), r.nextInt(500), r.nextInt(400));
			hub.addPackage(p);
			break;
		default:
			p=null;
			//return ;
		}
		
		this.packages.add(p);
		
		return p;
		
	}
	
	
	public synchronized void setSuspend() {
	   	threadSuspend = true;
	   	for (Customer c : customer)
	   		c.setSuspend();
	   	
		for (Truck t : hub.listTrucks) {
			t.setSuspend();
		}
		for (Branch b: hub.getBranches()) {
			for (Truck t : b.listTrucks) {
				t.setSuspend();
			}
			b.setSuspend();
		}
		hub.setSuspend();
	}

	
	
	public synchronized void setResume() {
	   	threadSuspend = false;
	   	notify();
	   	hub.setResume();
	   	for (Customer c : customer)
	   		c.setResume();
		for (Truck t : hub.listTrucks) {
			t.setResume();
		}
		for (Branch b: hub.getBranches()) {
			b.setResume();
			for (Truck t : b.listTrucks) {
				t.setResume();;
			}
		}
	}



}
