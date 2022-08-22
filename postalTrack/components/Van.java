package components;

import java.awt.Color;
import java.awt.Graphics;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

/**
 * @author HaimRubin-209467281 & MatanFadida-315585505
 * <br>This class represents A vehicle that collects a package from the sender's address to the local branch 
 *  and delivers the package from the destination branch to the recipient's address
 *  <br>extends from @Truck
 */

public class Van extends Truck{
	ArrayBlockingQueue<Van> queue;
	public Van() {
		super();
		System.out.println("Creating " + this);
	}
	
	
	public Van(String licensePlate,String truckModel) {
		super(licensePlate,truckModel);
	}
	

	@Override
	public String toString() {
		return "Van ["+ super.toString() + "]";
	}
	
	
	@Override
	public synchronized void deliverPackage(Package p) {
		this.getPackages().add(p);
		setAvailable(false);
		int time=(p.getDestinationAddress().street%10+1)*10;
		this.setTimeLeft(time);
		this.initTime = time;
		p.setStatus(Status.DISTRIBUTION);
		p.addTracking(new Tracking(MainOffice.getClock(), this, p.getStatus()),p);
		System.out.println("Van "+ this.getTruckID() + " is delivering package " + p.getPackageID() + ", time left: "+ this.getTimeLeft()  );
	}
	
	/**
	 * Performs a work unit (in each beat) 
	 * <br>An available vehicle does nothing.
	 * <br>A vehicle found during a trip reduces the time left to the end of the trip (timeLeft) by 1.
	 * <br>If after the reduction the time value is equal to zero, then the trip is over and a 
	 * vehicle has performed the task for which it was sent.
	 * <br>If the purpose of the trip was to collect a package from a sending customer (COLLECTION), 
	 * the package at this stage will be transferred from the vehicle to the branch, the status of the package will be updated,
	 *  a suitable listing will be added to the tracking list, and a message will be printed.
	 *  <br>If the purpose of the trip was to deliver the package to the customer (DISTRIBUTION), the package will be 
	 *  removed from the list of packages in the vehicle, the status of the package and the transfer history will be 
	 *  updated accordingly and a notice will be printed that the package has been delivered to the customer.
	 */
	
	@Override
	public void run() {
		while(true) {
			try {
				Thread.sleep(300);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		    synchronized(this) {
                while (threadSuspend)
					try {
						wait();
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
		    }
			Branch branch=null;
			if (!this.isAvailable()) {
				this.setTimeLeft(this.getTimeLeft()-1);
				if (this.getTimeLeft()==0){
					for (Package p : this.getPackages()) {
						if (p.getStatus()==Status.COLLECTION) {
							branch=MainOffice.getHub().getBranches().get(p.getSenderAddress().zip);
							synchronized(branch) {
								p.setStatus(Status.BRANCH_STORAGE);
								System.out.println("Van " + this.getTruckID() + " has collected package " +p.getPackageID()+" and arrived back to branch " + branch.getBranchId());
								branch.addPackage(p);
							}
						}
						else {
							p.setStatus(Status.DELIVERED);
							branch=MainOffice.getHub().getBranches().get(p.getDestinationAddress().zip);
							synchronized(branch) {
								branch.listPackages.remove(p);
								branch=null;
								System.out.println("Van " + this.getTruckID() + " has delivered package "+p.getPackageID() + " to the destination");
								if (p instanceof SmallPackage && ((SmallPackage)p).isAcknowledge()) {
									System.out.println("Acknowledge sent for package "+p.getPackageID());
								}
							}
						}
						p.addTracking(new Tracking(MainOffice.getClock(), branch, p.getStatus()),p);
	
					}
					this.getPackages().removeAll(getPackages());
					this.setAvailable(true);
				}
			}
			else 				
				synchronized(this) {
					try {
						wait();
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
		}
		
	}
	
	@Override
	public void work() {}


	@Override
	public void paintComponent(Graphics g) {
		if (isAvailable()) return;
		Package p = this.getPackages().get(getPackages().size()-1);	
		Point start=null;
		Point end=null;
		if (p.getStatus()==Status.COLLECTION) {
			start = p.getSendPoint();
			end = p.getBInPoint();
		}
		else if (p.getStatus()==Status.DISTRIBUTION) {
			start = p.getBOutPoint();
			end = p.getDestPoint();
		}
		
		if (start!=null) {
			int x2 = start.getX();
			int y2 = start.getY();
			int x1 = end.getX();
			int y1 = end.getY();
				
			double ratio = (double) this.getTimeLeft()/this.initTime;
			double length = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
			int dX = (int) (ratio*(x2-x1));
			int dY = (int) (ratio*(y2-y1));
				
			g.setColor(Color.BLUE);
			g.fillRect(dX+x1-8, dY+y1-8, 16, 16); 
			g.setColor(Color.BLACK);
			g.fillOval(dX+x1-12, dY+y1-12, 10, 10);
			g.fillOval(dX+x1, dY+y1, 10, 10);
			g.fillOval(dX+x1, dY+y1-12, 10, 10);
			g.fillOval(dX+x1-12, dY+y1, 10, 10);
		}
			
		
	}



}
