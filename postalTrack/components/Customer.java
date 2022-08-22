package components;

import java.io.DataInputStream;
import java.io.EOFException;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Random;
import java.util.concurrent.locks.ReadWriteLock;

/**
 * @author HaimRubin-209467281 & MatanFadida-315585505
 * <p>fields:
 * <br>packages - A collection of all the packages that customer creation ({@link}Package)
 * <br>lock - read from the file all the packages
 */
public class Customer implements Runnable{
	private boolean threadSuspend=false;
	Address myAddress;
	private static int counterID=0;
	int ID;
	File f = new File("C:\\Users\\מתן פדידה\\Desktop\\traking.txt");
	DataInputStream in = null;
	ReadWriteLock lock = MainOffice.lock;
	private Package[] packages = new Package[5];
	boolean flag = true;
	public Customer() {
		Random r = new Random();
		myAddress = new Address(r.nextInt(MainOffice.getHub().getBranches().size()), r.nextInt(999999)+100000);
		ID= counterID++;
	}

	/**
	 * read from the file if all the package of customer have arrived to the destination
	 */
	@Override
	public void run() {
		int i = 0;
		int packageID;
		String packageStatus;
		while(flag) {
			synchronized(this) {
				while (threadSuspend)
					try {
						wait();
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
			}
			if(i < 5) {
				packages[i] = MainOffice.getInstance().addPackage(myAddress);
				i++;
				try {
					Thread.sleep((int)Math.random()*3000+2000);
				} catch (InterruptedException e) {}
			}
			else {
				try {
					Thread.sleep(10000);
				} catch (InterruptedException e) {}
				try {
					lock.readLock().lock();
					in = new DataInputStream(new FileInputStream(f));
					while(true)
					{
						in.readInt();
						in.readChar();
						packageID=in.readInt();
						in.readChar();
						packageStatus= in.readUTF();
						in.readChar();
						in.readInt();
						in.readChar();
						in.readInt();
						in.readChar();
						
						
						if (packageStatus.contains("DELIVERED")){
							for (int index=0; index<5 ; index++) {
								if (packages[index] != null) {
									if (packageID == (packages[index]).getPackageID()) {
										packages[index] = null;
									}
								}
							}
						}								
					}
				} catch (FileNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (EOFException e) {}
				catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					System.out.println("aaaa");
				}
				finally
				{
					if (in != null) 
					{
						try
						{
							lock.readLock().unlock();
							in.close();
							if (packages[0] == null && packages[1] == null && packages[2] == null && packages[3] == null && packages[4] == null ) {
								flag=false;
							}
						} 
						catch (IOException e) {e.printStackTrace();}
					}
				}
			}
		}
	}
	
	public synchronized void setSuspend() {
	   	threadSuspend = true;
	}

	public synchronized void setResume() {
	   	threadSuspend = false;
	   	notify();
	}
	public void setFlag(boolean f) {
		this.flag=f;
	}
	public int getID() {
		return ID;
	}
}
